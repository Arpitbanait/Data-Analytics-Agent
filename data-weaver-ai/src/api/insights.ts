// src/api/insights.ts
import { backend } from "@/api/backend";

export interface InsightsResponse {
  insights: string;
  key_findings?: string[];
}
 
export async function generateInsights(
  analysisId: string
): Promise<InsightsResponse> {
  const res = await backend.post(`/insights/`, {
    analysis_id: analysisId,
  });
  return res.data;
}

export async function getInsights(
  analysisId: string
): Promise<InsightsResponse> {
  const res = await backend.get(`/insights/${analysisId}`);
  return res.data;
}
