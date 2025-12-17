import { backend } from "./backend";

export async function startAnalysis(
  jobId: string,
  userId?: string,
  columns?: string[]
) {
  const res = await backend.post("/analyze", {
    job_id: jobId,
    user_id: userId,
    columns,
  });

  return res.data as {
    analysis_id: string;
  };
}

export async function getAnalysisResults(analysisId: string) {
  const res = await backend.get(`/analyze/${analysisId}`);
  return res.data as {
    analysis_id: string;
    eda?: unknown;
    charts?: unknown;
    insights?: unknown;
  };
}
