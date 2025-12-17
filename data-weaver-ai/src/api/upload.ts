// src/api/upload.ts
import { backend } from "@/api/backend";

export interface UploadResponse {
  job_id: string;
  message: string;
}

export async function uploadFile(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await backend.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}
