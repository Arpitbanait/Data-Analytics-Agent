#!/usr/bin/env python3
"""
RAG Pipeline Verification Script
Checks all components are properly installed and configured
"""

import sys
import os

def print_section(title):
    print(f"\n{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}")

def check_module(module_name, package_name=None):
    """Check if a module is installed"""
    if package_name is None:
        package_name = module_name
    
    try:
        __import__(module_name)
        print(f"✅ {package_name:<40} INSTALLED")
        return True
    except ImportError:
        print(f"❌ {package_name:<40} MISSING")
        return False

def check_env_var(var_name, required=True):
    """Check if an environment variable is set"""
    value = os.getenv(var_name)
    if value:
        # Show only first and last chars for security
        masked = value[0] + "*" * (len(value) - 2) + value[-1] if len(value) > 2 else value
        print(f"✅ {var_name:<40} SET ({masked})")
        return True
    elif required:
        print(f"⚠️  {var_name:<40} NOT SET (required)")
        return False
    else:
        print(f"ℹ️  {var_name:<40} OPTIONAL (not set)")
        return True

def check_huggingface_model():
    """Check if HuggingFace model can be loaded"""
    try:
        from sentence_transformers import SentenceTransformer
        print("\n  Checking HuggingFace model availability...")
        print("  (First load will download model - ~50MB)")
        
        # Try to instantiate the model (will download if not present)
        model = SentenceTransformer("all-MiniLM-L6-v2")
        
        # Test embedding
        test_text = "Carbon Aware Computing"
        embedding = model.encode(test_text)
        
        print(f"✅ HuggingFace Model (all-MiniLM-L6-v2)      READY")
        print(f"   Embedding dimension: {len(embedding)}")
        return True
    except Exception as e:
        print(f"❌ HuggingFace Model                         ERROR: {str(e)}")
        return False

def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)) or ".")
    
    print_section("RAG PIPELINE VERIFICATION")
    
    all_good = True
    
    # Check Python version
    print("\n📋 Python Environment")
    print(f"   Version: {sys.version.split()[0]}")
    if sys.version_info >= (3, 8):
        print("   ✅ Python 3.8+")
    else:
        print("   ❌ Python 3.8+ required")
        all_good = False
    
    # Check backend dependencies
    print_section("Backend Dependencies")
    
    backend_deps = [
        ("fastapi", "FastAPI"),
        ("uvicorn", "Uvicorn"),
        ("langchain", "LangChain"),
        ("langchain_anthropic", "LangChain Anthropic"),
        ("langchain_community", "LangChain Community"),
        ("pydantic", "Pydantic"),
        ("dotenv", "python-dotenv"),
        ("pymupdf", "PyMuPDF"),
        ("docx", "python-docx"),
        ("sentence_transformers", "Sentence Transformers"),
    ]
    
    for module, name in backend_deps:
        if not check_module(module, name):
            all_good = False
    
    # Check environment variables
    print_section("Environment Variables")
    
    if not check_env_var("ANTHROPIC_API_KEY", required=True):
        all_good = False
    
    check_env_var("HF_EMBEDDING_MODEL", required=False)
    
    # Check HuggingFace model
    print_section("HuggingFace Embeddings")
    if not check_huggingface_model():
        all_good = False
    
    # Check file structure
    print_section("Project Structure")
    
    required_files = [
        "backend/main.py",
        "backend/llm/slide_planner.py",
        "backend/llm/rag_pipeline.py",
        "backend/requirements.txt",
        "backend/.env",
        "frontend/src/App.tsx",
    ]
    
    for file_path in required_files:
        if os.path.exists(file_path):
            print(f"✅ {file_path:<50} EXISTS")
        else:
            print(f"❌ {file_path:<50} MISSING")
            all_good = False
    
    # Summary
    print_section("Summary")
    
    if all_good:
        print("\n✅ ALL CHECKS PASSED!")
        print("\n🚀 You're ready to use RAG pipeline:")
        print("\n  1. Start backend:  cd backend && python -m uvicorn main:app --reload")
        print("  2. Start frontend: cd frontend && npm run dev")
        print("  3. Visit:          http://localhost:5173")
        print("  4. Upload a file and generate slides!")
        return 0
    else:
        print("\n❌ SOME CHECKS FAILED")
        print("\n⚠️  Fix the issues above before running:")
        print("\n  1. pip install -r requirements.txt")
        print("  2. Update .env with ANTHROPIC_API_KEY")
        print("  3. Run this script again")
        return 1

if __name__ == "__main__":
    sys.exit(main())
