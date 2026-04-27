from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field, ConfigDict
from sqlalchemy import create_engine, inspect
from sqlalchemy.exc import SQLAlchemyError
import pandas as pd
import numpy as np
import uuid
from datetime import date, datetime, time
from decimal import Decimal

router = APIRouter()


class ConnectRequest(BaseModel):
    connection_string: str
    db_type: str


@router.post("")
def connect_database(request: ConnectRequest):
    if not request.connection_string:
        raise HTTPException(status_code=400, detail="connection_string is required")

    try:
        conn_str = request.connection_string.strip()

        if request.db_type:
            db_type = request.db_type.lower()
            if db_type.startswith("postgres"):
                if "+" not in conn_str and conn_str.startswith("postgresql://"):
                    conn_str = conn_str.replace("postgresql://", "postgresql+psycopg2://", 1)
            elif db_type.startswith("mysql"):
                if "+" not in conn_str and conn_str.startswith("mysql://"):
                    conn_str = conn_str.replace("mysql://", "mysql+pymysql://", 1)
            elif db_type.startswith("sqlite"):

                pass

        engine = create_engine(conn_str, pool_pre_ping=True)
        with engine.connect() as conn:
            inspector = inspect(conn)
            tables = inspector.get_table_names()

        return {
            "db_type": request.db_type,
            "connection_string": conn_str,
            "tables": tables,
            "message": "Connection successful",
        }
    
    except SQLAlchemyError as e:
        raise HTTPException(status_code=400, detail=f"Database connection failed: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")


class LoadTableRequest(BaseModel):
    connection_string: str
    db_type: str
    table: str
    table_schema: str | None = Field(None, alias="schema")
    limit: int | None = 10000

    model_config = ConfigDict(populate_by_name=True)


@router.post("/load-table")
def load_table(request: LoadTableRequest):
    print(f"[load-table] Received request: {request}")
    
    if not request.connection_string or not request.table:
        raise HTTPException(status_code=400, detail="connection_string and table are required")

    
    conn_str = request.connection_string.strip()
    db_type = (request.db_type or "").lower()
    if db_type.startswith("postgres"):
        if "+" not in conn_str and conn_str.startswith("postgresql://"):
            conn_str = conn_str.replace("postgresql://", "postgresql+psycopg2://", 1)
    elif db_type.startswith("mysql"):
        if "+" not in conn_str and conn_str.startswith("mysql://"):
            conn_str = conn_str.replace("mysql://", "mysql+pymysql://", 1)

    try:
        print(f"[load-table] Connecting with: {db_type}")
        engine = create_engine(conn_str, pool_pre_ping=True)
        with engine.connect() as conn: 
           
            from sqlalchemy import MetaData, Table, select
            metadata = MetaData()
            try:
                table_obj = Table(request.table, metadata, schema=request.table_schema, autoload_with=conn)
            except Exception as e:
                raise HTTPException(status_code=400, detail=f"Table not found or inaccessible: {str(e)}")

            stmt = select(table_obj)
            if request.limit and request.limit > 0: 
                stmt = stmt.limit(int(request.limit))

            print(f"[load-table] Executing reflected select with limit={request.limit}")
            df = pd.read_sql(stmt, conn)
            print(f"[load-table] Got {len(df)} rows, {len(df.columns)} columns")

        if df.empty:
            raise HTTPException(status_code=400, detail="Selected table returned no rows")

     
        def _to_jsonable(v):
            if isinstance(v, (pd.Timestamp, datetime, date, time)):
                try:
                    return v.isoformat()
                except Exception:
                    return str(v)
            if isinstance(v, Decimal):
                try:
                    return float(v)
                except Exception:
                    return str(v)
            return v

        df = df.applymap(_to_jsonable)
        df = df.replace([np.inf, -np.inf], np.nan)
        df = df.astype(object).where(pd.notnull(df), None)

    
        from app.core.job_manager_file import create_job, save_job_data
        job_id = str(uuid.uuid4())
        create_job(job_id)
        payload = {
            "source": "database",
            "table": request.table,
            "schema": request.table_schema,
            "db_type": request.db_type,
            "connection_string": conn_str,
            "filename": f"{request.table}.csv",
            "data": df.to_dict(orient="list"),
        }
        save_job_data(job_id, payload)

        print(f"[load-table] Successfully created job: {job_id}")
        return {"job_id": job_id, "rows": len(df), "columns": list(df.columns)}
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        print(f"[load-table] SQLAlchemy error: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Database error: {str(e)}")
    except Exception as e:
        print(f"[load-table] Unexpected error: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
