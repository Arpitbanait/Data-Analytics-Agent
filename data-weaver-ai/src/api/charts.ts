import { backend } from "./backend";

export async function generateCharts(analysisId: string) {
  const res = await backend.post("/charts", {
    analysis_id: analysisId,
  });

  return res.data;
}

export async function getCharts(analysisId: string) {
  const res = await backend.get(`/charts/${analysisId}`);
  return res.data as {
    charts: Array<{
      type: string;
      title: string;
      column?: string;
      figure?: string; // Plotly JSON
      data?: string;   // Plotly JSON
    }>;
  };
}
