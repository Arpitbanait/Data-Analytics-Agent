from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.core.job_manager_file import get_analysis

router = APIRouter()


class DashboardRequest(BaseModel):
    analysis_id: str


@router.post("")
def build_dashboard(request: DashboardRequest):
    analysis = get_analysis(request.analysis_id)
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")

    # Simple dashboard payload derived from available analysis data
    dashboard = {
        "analysis_id": request.analysis_id,
        "widgets": {
            "summary": analysis.get("eda", {}).get("summary"),
            "charts": analysis.get("charts", []),
            "insights": analysis.get("insights"),
        },
    }

    return {
        "analysis_id": request.analysis_id,
        "dashboard": dashboard,
        "message": "Dashboard generated",
    }


@router.get("/{analysis_id}")
def get_dashboard(analysis_id: str):
    analysis = get_analysis(analysis_id)
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")

    return {
        "analysis_id": analysis_id,
        "dashboard": {
            "summary": analysis.get("eda", {}).get("summary"),
            "charts": analysis.get("charts", []),
            "insights": analysis.get("insights"),
        },
    }
