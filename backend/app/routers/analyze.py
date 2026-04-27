from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.agents.eda_agent import run_eda
from app.core.job_manager_file import get_job_data, create_analysis, get_analysis
import uuid

router = APIRouter()

class AnalyzeRequest(BaseModel):
    job_id: str
    columns: list[str] | None = None
    user_id: str | None = None

@router.post("")
async def analyze_data(request: AnalyzeRequest):
    job_data = get_job_data(request.job_id)
    if not job_data:
        raise HTTPException(status_code=404, detail="Job not found")

    analysis_id = str(uuid.uuid4())

    create_analysis(analysis_id, request.job_id, request.user_id)

    
    run_eda(analysis_id)

    analysis = get_analysis(analysis_id)
    preprocessing = analysis.get("eda", {}).get("preprocessing", {})

    return {
        "analysis_id": analysis_id,
        "message": "EDA completed",
        "preprocessing": preprocessing
    }


@router.get("/{analysis_id}")
def get_analysis_results(analysis_id: str):
    analysis = get_analysis(analysis_id)
    if not analysis or "eda" not in analysis:
        raise HTTPException(status_code=404, detail="Analysis not available yet")

    return {
        "analysis_id": analysis_id,
        "eda": analysis.get("eda"),
        "charts": analysis.get("charts", []),
        "insights": analysis.get("insights"),
    }
