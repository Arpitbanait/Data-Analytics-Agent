import requests
import json

# Test the slide generation endpoint
url = "http://127.0.0.1:8000/generate-slides"

payload = {
    "topic": "Artificial Intelligence in Healthcare",
    "audience": "Medical professionals",
    "slides": 6,
    "tone": "professional"
}

try:
    response = requests.post(url, json=payload, timeout=60)
    response.raise_for_status()
    
    result = response.json()
    print(f"Status: {response.status_code}")
    print(f"Number of slides generated: {len(result.get('slides', []))}")
    print("\nSlide Summary:")
    print("-" * 60)
    
    for i, slide in enumerate(result.get('slides', []), 1):
        print(f"\nSlide {i}:")
        print(f"  Layout: {slide.get('layout')}")
        print(f"  Title: {slide.get('title')}")
        if 'subtitle' in slide:
            print(f"  Subtitle: {slide.get('subtitle')}")
        if 'cards' in slide:
            print(f"  Cards: {len(slide.get('cards', []))} cards")
            for j, card in enumerate(slide.get('cards', []), 1):
                print(f"    - {card.get('heading')}: {card.get('text')[:50]}...")
    
    print("\n" + "-" * 60)
    print("\nFull JSON Response:")
    print(json.dumps(result, indent=2))
    
except requests.exceptions.RequestException as e:
    print(f"Error: {e}")
except json.JSONDecodeError as e:
    print(f"JSON Error: {e}")
    print(f"Response text: {response.text}")
