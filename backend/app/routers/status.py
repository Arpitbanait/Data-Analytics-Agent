# app/routers/status.py
from fastapi import APIRouter, HTTPException
from app.core.job_manager_file import get_status, get_analysis
from pathlib import Path
import json
from datetime import datetime

router = APIRouter()


@router.get("/job/{job_id}")
def get_job_status(job_id: str):
    status = get_status(job_id, entity_type="job")
    if not status:
        raise HTTPException(status_code=404, detail="Job not found")

    return status


@router.get("/analysis/{analysis_id}")
def get_analysis_status(analysis_id: str):
    status = get_status(analysis_id, entity_type="analysis")
    if not status:
        raise HTTPException(status_code=404, detail="Analysis not found")

    return status


@router.get("/analyses")
def list_recent_analyses(limit: int = 10, user_id: str | None = None):
    """List recent analyses from file storage, optionally filtered by user_id"""
    analyses = []
    jobs_dir = Path("./jobs_data")
    
    if not jobs_dir.exists():
        return {"analyses": []}
    
    # Scan for analysis_* files
    for file_path in sorted(jobs_dir.glob("analysis_*.json"), key=lambda p: p.stat().st_mtime, reverse=True):
        try:
            with open(file_path, 'r') as f:
                data = json.load(f)
            
            # Filter by user_id if provided
            analysis_user_id = data.get("user_id")
            if user_id and analysis_user_id != user_id:
                continue
            
            analysis_id = file_path.stem.replace("analysis_", "")
            job_id = data.get("job_id", "")
            
            # Get job data for source info
            job_data = None
            if job_id:
                job_file = jobs_dir / f"{job_id}.json"
                if job_file.exists():
                    with open(job_file, 'r') as f:
                        job_data = json.load(f).get("data", {})
            
            analysis = {
                "id": analysis_id,
                "name": f"Analysis - {job_data.get('filename', 'Unknown') if job_data else 'Unknown'}",
                "description": None,
                "source_type": job_data.get("source", "file") if job_data else "file",
                "source_name": job_data.get("filename", "Unknown") if job_data else "Unknown",
                "status": data.get("status", "unknown"),
                "created_at": datetime.fromtimestamp(file_path.stat().st_mtime).isoformat(),
                "updated_at": datetime.fromtimestamp(file_path.stat().st_mtime).isoformat(),
            }
            analyses.append(analysis)
            
            if len(analyses) >= limit:
                break
        except Exception as e:
            print(f"Error reading analysis {file_path}: {str(e)}")
            continue
    
    return {"analyses": analyses}
