from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import shutil
import os
from llm.slide_planner import generate_slide_plan
from parsers.pdf_parser import extract_text_from_pdf
from parsers.docx_parser import extract_text_from_docx
from llm.rag_pipeline import get_rag_pipeline

app = FastAPI(title="AI Presentation Generator")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SlideRequest(BaseModel):
    topic: str
    audience: str = "Business executives"
    tone: str = "professional"


class FileSlideRequest(BaseModel):
    topic: str
    audience: str = "Business executives"
    tone: str = "professional"


@app.post("/generate-slides")
def generate_slides(req: SlideRequest):
    """Generate slides based on topic (without file context)"""
    return generate_slide_plan(
        topic=req.topic,
        audience=req.audience,
        tone=req.tone,
        use_rag_context=False
    )


@app.post("/process-file")
async def process_file(file: UploadFile = File(...)):
    """Process and store file embeddings in vector store"""
    file_path = f"temp_{file.filename}"
    
    try:
        print(f"[API] Processing file: {file.filename}")
        
        # Save uploaded file
        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)
        
        # Process file with RAG pipeline
        rag_pipeline = get_rag_pipeline()
        result = rag_pipeline.process_file(file_path)
        
        return result
    
    except Exception as e:
        print(f"[API] Error processing file: {str(e)}")
        return {"status": "error", "message": str(e)}
    
    finally:
        # Clean up temp file
        if os.path.exists(file_path):
            os.remove(file_path)


@app.post("/generate-slides-with-context")
def generate_slides_with_context(req: SlideRequest):
    """Generate slides using RAG context from previously uploaded file"""
    return generate_slide_plan(
        topic=req.topic,
        audience=req.audience,
        tone=req.tone,
        use_rag_context=True
    )


@app.post("/generate-from-file")
async def generate_from_file(
    file: UploadFile = File(...),
    topic: str = None,
    audience: str = "Business executives",
    tone: str = "professional"
):
    """Process file, store embeddings, and generate 10 slides with RAG context"""
    file_path = f"temp_{file.filename}"

    try:
        print(f"[API] Processing file and generating slides: {file.filename}")
        
        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)

       
        rag_pipeline = get_rag_pipeline()
        rag_result = rag_pipeline.process_file(file_path)
        
        if rag_result.get("status") != "success":
            return {
                "status": "error",
                "message": f"Failed to process file: {rag_result.get('message', 'Unknown error')}"
            }
        
       
        if not topic:
            topic = os.path.splitext(file.filename)[0]
        
        print(f"[API] Generating slides about: {topic}")
        
     
        slides_response = generate_slide_plan(
            topic=topic,
            audience=audience,
            tone=tone,
            use_rag_context=True
        )
        
       
        slides_array = slides_response.get("slides", []) if isinstance(slides_response, dict) else []
        
        return {
            "status": "success",
            "file_processed": rag_result,
            "slides": slides_array
        }
    
    except Exception as e:
        print(f"[API] Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return {"status": "error", "message": str(e)}
    
    finally:
        # Clean up temp file
        if os.path.exists(file_path):
            os.remove(file_path)


@app.get("/clear-context")
def clear_context():
    """Clear RAG context (for privacy after session)"""
    rag_pipeline = get_rag_pipeline()
    rag_pipeline.clear()
    return {"status": "success", "message": "Context cleared"}


@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "ok", "message": "API is running"}
















