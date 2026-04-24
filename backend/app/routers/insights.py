# app/routers/insights.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.agents.insight_agent import generate_insights
from app.core.job_manager_file import get_analysis

router = APIRouter()


class InsightRequest(BaseModel):
    analysis_id: str


@router.post("")
def create_insights(request: InsightRequest):
    analysis = get_analysis(request.analysis_id)
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")

    try:
       
        result = generate_insights(request.analysis_id)
        print(f"Insights generated: {result}")
    except Exception as e:
        print(f"Error generating insights: {str(e)}")
        import traceback
        traceback.print_exc()
        return {
            "analysis_id": request.analysis_id,
            "insights": f"Error generating insights: {str(e)}",
            "error": str(e)
        }
    
    # Fetch and return the generated insights
    updated_analysis = get_analysis(request.analysis_id)
    return {
        "analysis_id": request.analysis_id,
        "insights": updated_analysis.get("insights", "")
    }


@router.get("/{analysis_id}")
def get_insights(analysis_id: str):
    analysis = get_analysis(analysis_id)
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    insights = analysis.get("insights")
    if insights:
        return {
            "analysis_id": analysis_id,
            "insights": insights
        }

    # If insights are missing, attempt generation synchronously as a fallback.
    try:
        generate_insights(analysis_id)
        refreshed = get_analysis(analysis_id)
        generated = refreshed.get("insights") if refreshed else None
        return {
            "analysis_id": analysis_id,
            "insights": generated or []
        }
    except Exception as e:
        print(f"Error generating insights on GET: {str(e)}")
        return {
            "analysis_id": analysis_id,
            "insights": []
        }
