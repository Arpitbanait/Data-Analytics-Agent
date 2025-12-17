from pydantic import BaseModel
from typing import List, Dict, Any, Optional


# =========================
# UPLOAD / JOB SCHEMAS
# =========================

class UploadResponse(BaseModel):
    job_id: str
    message: str


class JobStatusResponse(BaseModel):
    status: str
    progress: int


# =========================
# ANALYSIS SCHEMAS
# =========================

class AnalyzeRequest(BaseModel):
    job_id: str
    columns: Optional[List[str]] = None


class AnalyzeResponse(BaseModel):
    analysis_id: str
    message: str


class AnalysisStatusResponse(BaseModel):
    status: str
    progress: int


# =========================
# EDA RESULT SCHEMAS
# =========================

class ColumnSummary(BaseModel):
    name: str
    dtype: str
    non_null: int
    unique: int
    missing: int


class EDASummary(BaseModel):
    rows: int
    columns: int
    memory_usage_kb: float


class EDAResult(BaseModel):
    summary: EDASummary
    columns: List[ColumnSummary]
    statistics: Dict[str, Any]
    missing_values: Dict[str, int]
    correlations: Dict[str, Dict[str, float]]


# =========================
# CHART SCHEMAS
# =========================

class ChartSchema(BaseModel):
    type: str                 # histogram | bar | heatmap
    title: str
    column: Optional[str] = None
    figure: str               # plotly JSON
    data: Optional[str] = None


class ChartsResponse(BaseModel):
    analysis_id: str
    charts: List[ChartSchema]


# =========================
# INSIGHTS SCHEMAS
# =========================

class InsightResponse(BaseModel):
    analysis_id: str
    insights: str


# =========================
# FULL ANALYSIS RESPONSE
# =========================

class FullAnalysisResponse(BaseModel):
    eda: Optional[EDAResult] = None
    charts: Optional[List[ChartSchema]] = None
    insights: Optional[str] = None
