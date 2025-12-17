// src/api/status.ts
import { backend } from "@/api/backend";

export interface JobStatus {
  status: "pending" | "processing" | "completed" | "failed";
  progress: number;
  result?: any;
  error?: string;
}

export async function getJobStatus(jobId: string): Promise<JobStatus> {
  const res = await backend.get(`/status/job/${jobId}`);
  return res.data;
}

export async function getAnalysisStatus(analysisId: string) {
  const res = await backend.get(`/status/analysis/${analysisId}`);
  return res.data;
}
