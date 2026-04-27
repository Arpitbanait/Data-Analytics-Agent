// src/api/export.ts
import { backend } from "@/api/backend";

export async function exportPythonCode(analysisId: string): Promise<void> {
  const response = await backend.get(`/export/python/${analysisId}`, {
    responseType: 'blob',
  });
  
  // Create download link
  const blob = new Blob([response.data], { type: 'text/x-python' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `analysis_${analysisId.slice(0, 8)}.py`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
