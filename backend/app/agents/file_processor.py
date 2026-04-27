from app.celery_app import celery_app
from app.core.job_manager_file import (
    update_job_status,
    save_job_data,
)
import pandas as pd
import io


@celery_app.task(bind=True)
def process_file(self, job_id: str, content: bytes, filename: str):
    try:
        
        update_job_status(job_id, "processing", progress=10)

        if filename.endswith(".csv"):
            df = pd.read_csv(io.BytesIO(content))
        elif filename.endswith((".xlsx", ".xls")):
            df = pd.read_excel(io.BytesIO(content))
        else:
            raise ValueError("Unsupported file format")

        update_job_status(job_id, "processing", progress=50)

     
        save_job_data(
            job_id,
            {
                "filename": filename,
                "data": df.to_dict(orient="list"),
                "columns": list(df.columns),
                "rows": len(df),
            },
        )

        update_job_status(job_id, "completed", progress=100)

    except Exception as e:
        update_job_status(job_id, "failed", progress=0)
        raise e
