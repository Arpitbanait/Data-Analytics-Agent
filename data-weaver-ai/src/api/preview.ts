import { backend } from "./backend";

export async function getDataPreview(analysisId: string, limit = 10) {
  const res = await backend.get(`/export/preview/${analysisId}`, {
    params: { limit },
  });

  return res.data as {
    analysis_id: string;
    columns: string[];
    rows: Array<Record<string, unknown>>;
    total_rows: number;
  };
}
