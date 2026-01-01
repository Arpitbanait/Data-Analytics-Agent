import fitz  # PyMuPDF

def extract_text_from_pdf(file_path: str) -> str:
    """Extract text from PDF file using multiple methods"""
    try:
        doc = fitz.open(file_path)
        text = ""
        
        print(f"[PDF Parser] Opening PDF with {len(doc)} pages")
        
        # Method 1: Standard text extraction
        for page_num, page in enumerate(doc):
            page_text = page.get_text()
            text += page_text
            if page_text.strip():
                print(f"[PDF Parser] Page {page_num + 1}: {len(page_text)} characters")
        
        # Method 2: Try different extraction modes if first method failed
        if len(text.strip()) == 0:
            print("[PDF Parser] Standard extraction failed, trying alternative methods...")
            for page_num, page in enumerate(doc):
                # Try "text" mode
                page_text = page.get_text("text")
                text += page_text
                
                # Try "blocks" mode
                if not page_text.strip():
                    blocks = page.get_text("blocks")
                    for block in blocks:
                        if len(block) >= 5:  # Block contains text
                            text += block[4] + "\n"
        
        doc.close()
        
        extracted_length = len(text.strip())
        print(f"[PDF Parser] Total extracted: {extracted_length} characters")
        
        # If still no text, it's likely a scanned/image PDF
        if extracted_length == 0:
            print("[PDF Parser] WARNING: PDF appears to be image-based with no text layer")
            print("[PDF Parser] Consider using OCR or providing a text-based PDF")
            return ""
        
        return text.strip()
    except Exception as e:
        print(f"[PDF Parser] Error: {e}")
        import traceback
        traceback.print_exc()
        return ""

