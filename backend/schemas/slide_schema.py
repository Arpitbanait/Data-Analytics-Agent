from pydantic import BaseModel
from typing import List, Optional


class Card(BaseModel):
    heading: str
    text: str


class Slide(BaseModel):
    slide_id: int
    layout: str  
    title: str
    subtitle: Optional[str] = None
    visual: Optional[str] = None
    cards: Optional[List[Card]] = None


class Presentation(BaseModel):
    title: str
    audience: str
    theme: str
    slides: List[Slide]
