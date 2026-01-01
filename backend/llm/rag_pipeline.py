"""
RAG Pipeline for PPT Generator
Handles embedding, vector storage, and context retrieval from user-uploaded files
Uses HuggingFace embeddings (free, no API key needed)
"""

import os
import json
from typing import List, Dict, Optional
import hashlib
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_core.embeddings import Embeddings
import pymupdf
from docx import Document as DocxDocument

class TextExtractor:
    """Extract text from PDF and DOCX files"""
    
    @staticmethod
    def extract_from_pdf(file_path: str) -> str:
        """Extract text from PDF file"""
        try:
            pdf = pymupdf.open(file_path)
            text = ""
            for page_num in range(len(pdf)):
                page = pdf[page_num]
                text += f"\n--- Page {page_num + 1} ---\n"
                text += page.get_text()
            pdf.close()
            return text.strip()
        except Exception as e:
            raise ValueError(f"Error extracting PDF: {str(e)}")
    
    @staticmethod
    def extract_from_docx(file_path: str) -> str:
        """Extract text from DOCX file"""
        try:
            doc = DocxDocument(file_path)
            text = ""
            for paragraph in doc.paragraphs:
                if paragraph.text.strip():
                    text += paragraph.text + "\n"
            return text.strip()
        except Exception as e:
            raise ValueError(f"Error extracting DOCX: {str(e)}")
    
    @staticmethod
    def extract_text(file_path: str) -> str:
        """Extract text from PDF or DOCX file"""
        if file_path.lower().endswith('.pdf'):
            return TextExtractor.extract_from_pdf(file_path)
        elif file_path.lower().endswith('.docx'):
            return TextExtractor.extract_from_docx(file_path)
        else:
            raise ValueError("Unsupported file format. Use PDF or DOCX.")


class InMemoryVectorStore:
    """Simple in-memory vector store for retrieved documents"""
    
    def __init__(self):
        self.documents: List[Dict] = []
        # Use HuggingFace embeddings (free, no API key needed)
        # Model: all-MiniLM-L6-v2 is small, fast, and effective
        self.embeddings_model = HuggingFaceEmbeddings(
            model_name="all-MiniLM-L6-v2",
            encode_kwargs={"normalize_embeddings": True}
        )
        print("[RAG] Initialized HuggingFace embeddings (all-MiniLM-L6-v2)")
    
    def add_documents(self, texts: List[str]):
        """Add documents to the store"""
        self.documents = []
        
        print(f"[RAG] Creating embeddings for {len(texts)} chunks...")
        
        # Create embeddings for each text
        embeddings = self.embeddings_model.embed_documents(texts)
        
        for i, (text, embedding) in enumerate(zip(texts, embeddings)):
            self.documents.append({
                "id": i,
                "text": text,
                "embedding": embedding
            })
        
        print(f"[RAG] Stored {len(self.documents)} document chunks with embeddings")
    
    def similarity_search(self, query: str, k: int = 5) -> List[str]:
        """Search for most relevant documents"""
        if not self.documents:
            return []
        
        # Embed the query
        query_embedding = self.embeddings_model.embed_query(query)
        
        # Calculate similarity scores (dot product with normalized vectors)
        scores = []
        for doc in self.documents:
            # Cosine similarity (since vectors are normalized)
            dot_product = sum(a * b for a, b in zip(query_embedding, doc["embedding"]))
            scores.append((doc["text"], dot_product))
        
        # Sort by score and return top k
        scores.sort(key=lambda x: x[1], reverse=True)
        return [text for text, _ in scores[:k]]


class RAGPipeline:
    """Main RAG Pipeline for context-aware PPT generation"""
    
    def __init__(self):
        self.vector_store = InMemoryVectorStore()
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=100,
            separators=["\n\n", "\n", " ", ""]
        )
        self.extractor = TextExtractor()
    
    def process_file(self, file_path: str) -> str:
        """
        Process uploaded file: extract text, split, create embeddings
        Returns: summary of processed content
        """
        try:
            print(f"[RAG] Processing file: {file_path}")
            
            # Step 1: Extract text from file
            text = self.extractor.extract_text(file_path)
            if not text:
                raise ValueError("File appears to be empty")
            
            print(f"[RAG] Extracted {len(text)} characters from file")
            
            # Step 2: Split text into chunks
            chunks = self.text_splitter.split_text(text)
            print(f"[RAG] Split into {len(chunks)} chunks of ~500 chars each")
            
            # Step 3: Store in vector store (with embeddings)
            self.vector_store.add_documents(chunks)
            
            # Return summary
            return {
                "status": "success",
                "file_name": os.path.basename(file_path),
                "extracted_chars": len(text),
                "chunks": len(chunks),
                "message": f"Successfully processed file with {len(chunks)} relevant sections"
            }
        
        except Exception as e:
            print(f"[RAG] Error processing file: {str(e)}")
            return {
                "status": "error",
                "message": str(e)
            }
    
    def retrieve_context(self, topic: str, k: int = 5) -> str:
        """
        Retrieve relevant context from processed file
        Returns: concatenated relevant text chunks
        """
        if not self.vector_store.documents:
            return ""
        
        # Search for relevant chunks
        relevant_chunks = self.vector_store.similarity_search(topic, k=k)
        
        if not relevant_chunks:
            return ""
        
        # Format context
        context = "\n\n".join([
            f"• {chunk[:200]}..." if len(chunk) > 200 else f"• {chunk}"
            for chunk in relevant_chunks
        ])
        
        print(f"[RAG] Retrieved {len(relevant_chunks)} relevant chunks for: {topic}")
        return context
    
    def clear(self):
        """Clear the vector store (for privacy after session)"""
        self.vector_store.documents = []
        print("[RAG] Vector store cleared")


# Global RAG pipeline instance
_rag_pipeline = None

def get_rag_pipeline() -> RAGPipeline:
    """Get or create RAG pipeline instance"""
    global _rag_pipeline
    if _rag_pipeline is None:
        _rag_pipeline = RAGPipeline()
    return _rag_pipeline
