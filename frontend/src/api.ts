export async function generateSlides(payload: {
  topic: string;
  audience: string;
  slides: number;
  tone: string;
}) {
  const res = await fetch("http://127.0.0.1:8000/generate-slides", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to generate slides");
  }

  return res.json();
}
