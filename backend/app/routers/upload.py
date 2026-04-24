from fastapi import APIRouter, UploadFile, File, HTTPException
from app.agents.file_processor import process_file
from app.core.job_manager_file import create_job
import uuid

router = APIRouter()

@router.post("")
async def upload_file(file: UploadFile = File(...)):
    if not file.filename.endswith((".csv", ".xlsx", ".xls")):
        raise HTTPException(status_code=400, detail="Only CSV and Excel files supported")

    job_id = str(uuid.uuid4())
    content = await file.read()

   
    create_job(job_id)

   
    process_file(job_id, content, file.filename)

    return {
        "job_id": job_id,
        "message": "File uploaded and processed successfully"
    }
