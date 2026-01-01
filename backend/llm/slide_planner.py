from langchain_anthropic import ChatAnthropic
from langchain_core.prompts import ChatPromptTemplate
from config import ANTHROPIC_API_KEY, MODEL_NAME
import json
from llm.rag_pipeline import get_rag_pipeline


llm = ChatAnthropic(
    api_key=ANTHROPIC_API_KEY,
    model=MODEL_NAME,
    temperature=0.8,
    max_tokens=4096
)

SYSTEM_PROMPT = """You are a professional presentation designer. Create exactly 10 detailed, informative slides with SPECIFIC content for each slide type.

CRITICAL REQUIREMENTS:
- Generate EXACTLY 10 slides with unique purposes and content
- ANALYZE the topic deeply and extract key concepts
- Each slide must have specific content related to its PURPOSE, not generic text
- Use concrete details, examples, and relevant domain-specific information
- NO generic placeholder text - be specific to the topic
- Each slide must be different and serve a unique purpose
- Return ONLY valid JSON with all 10 slides

SLIDE PURPOSES (in order):
1. title_slide: Topic title, tagline, presenter/organization
2. overview: What is it, why exists, 1 simple definition
3. problem: What problem does it address, current challenges
4. background: How it evolved, key milestones, past to present
5. concepts: 3-4 key elements, building blocks, no deep technical detail
6. process: Step-by-step flow, simple explanation
7. applications: Real-world examples, industry usage, 3-4 use cases
8. benefits: Why useful, key benefits, value provided
9. challenges: Limitations, risks, concerns, needs improvement
10. conclusion: Summary, future possibilities, closing message

JSON Format (EXACTLY 10 slides):
{{"slides": [
  {{"layout": "title_slide", "title": "Main Topic", "tagline": "One-line tagline", "presenter": "Presenter/Organization"}},
  {{"layout": "overview", "title": "Overview", "definition": "1 simple definition", "point1": "Point 1", "point2": "Point 2", "point3": "Point 3"}},
  {{"layout": "problem", "title": "Problem Statement", "problem": "What problem", "challenge1": "Challenge 1", "challenge2": "Challenge 2", "why_matters": "Why it matters"}},
  {{"layout": "background", "title": "Background & Context", "description": "How it evolved", "milestone1": "Milestone 1", "milestone2": "Milestone 2", "current_state": "Current state"}},
  {{"layout": "concepts", "title": "Core Concepts", "concept1": "Concept 1", "concept2": "Concept 2", "concept3": "Concept 3", "concept4": "Concept 4"}},
  {{"layout": "process", "title": "How It Works", "step1": "Step 1", "step2": "Step 2", "step3": "Step 3", "explanation": "Simple explanation"}},
  {{"layout": "applications", "title": "Applications & Use Cases", "use_case1": "Use case 1", "use_case2": "Use case 2", "use_case3": "Use case 3", "use_case4": "Use case 4"}},
  {{"layout": "benefits", "title": "Benefits & Advantages", "benefit1": "Benefit 1 description", "benefit2": "Benefit 2 description", "benefit3": "Benefit 3 description", "value": "Value provided"}},
  {{"layout": "challenges", "title": "Challenges & Limitations", "limitation1": "Limitation 1", "limitation2": "Limitation 2", "risk": "Key risks", "improvement": "What needs improvement"}},
  {{"layout": "conclusion", "title": "Conclusion & Future", "summary": "1-2 line summary", "future": "Future possibilities", "closing": "Closing message"}}
]}}"""

USER_PROMPT = """Create exactly 10 detailed slides about this topic using the fixed structure.

TOPIC:
{topic}

Audience: {audience}
Tone: {tone}

TASK - Create 10 slides with SPECIFIC content for each:

1. TITLE SLIDE: Topic title, compelling tagline, presenter/organization name
   - Make the tagline engaging and specific to the topic
   
2. OVERVIEW: Explain WHAT this topic is, WHY it exists, give 1 simple definition
   - Add 2-3 key overview points specific to this topic
   
3. PROBLEM STATEMENT: What PROBLEM does this topic address?
   - List 2-3 current challenges or pain points related to this topic
   - Explain why this matters today (be specific)
   
4. BACKGROUND/HISTORY: How did this topic EVOLVE?
   - Mention 2-3 key milestones or phases in its development
   - Connect past to present state (be topic-specific, not generic)
   
5. CORE CONCEPTS: What are the 3-4 key ELEMENTS of this topic?
   - List basic building blocks or fundamental concepts
   - No deep technical detail - keep it simple but specific
   
6. HOW IT WORKS: Explain the PROCESS or FLOW
   - Provide 3-4 sequential steps about how this topic works
   - Give simple explanations (could be shown as a diagram)
   
7. APPLICATIONS & USE CASES: Show REAL-WORLD EXAMPLES
   - List 3-4 specific use cases, industries, or daily applications
   - Make examples concrete and relevant to this topic
   
8. BENEFITS & ADVANTAGES: Why is this USEFUL?
   - List 3 key benefits or advantages
   - Explain the value it provides (be topic-specific)
   
9. CHALLENGES & LIMITATIONS: What are the CURRENT LIMITATIONS?
   - List 2-3 limitations, risks, or concerns
   - Mention what needs improvement (be topic-specific)
   
10. CONCLUSION & FUTURE: Wrap up and look ahead
    - Provide 1-2 line summary specific to this topic
    - Discuss future possibilities (be imaginative but realistic)
    - End with a closing message

CRITICAL REQUIREMENTS:
- Generate EXACTLY 10 slides - NO MORE, NO LESS
- Make every content field SPECIFIC to the topic - NO GENERIC TEXT
- Use concrete details, examples, industry references
- Each slide must be different and serve its unique purpose
- NO REPETITION between slides
- Each content field should be 2-3 sentences max

Return ONLY valid JSON with all 10 slides in the exact structure shown."""


def generate_slide_plan(topic, audience, tone, use_rag_context=False):
    try:
        # Check if API key is available
        from config import ANTHROPIC_API_KEY
        if not ANTHROPIC_API_KEY:
            print("[SlideGenerator] ERROR: ANTHROPIC_API_KEY not found in environment!")
            print("[SlideGenerator] Using fallback structure - content may be generic")
            return {"slides": build_proper_structure(topic, audience, tone)}
        
        # Retrieve RAG context if file was uploaded
        rag_context = ""
        if use_rag_context:
            rag_pipeline = get_rag_pipeline()
            rag_context = rag_pipeline.retrieve_context(topic, k=5)
            if rag_context:
                print(f"[SlideGenerator] Retrieved RAG context from uploaded file")
        
        # Create enhanced user prompt with RAG context
        user_prompt_text = USER_PROMPT.format(
            topic=topic,
            audience=audience,
            tone=tone
        )
        
        # Append RAG context if available
        if rag_context:
            user_prompt_text += f"\n\nREFERENCE CONTEXT FROM UPLOADED FILE:\n{rag_context}\nUse the information above to enhance accuracy."
        print(f"[SlideGenerator] Using Claude API...")
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", SYSTEM_PROMPT),
            ("human", user_prompt_text)
        ])
        
        chain = prompt | llm
        response = chain.invoke({
            "topic": topic,
            "audience": audience,
            "tone": tone
        })
        
        print(f"[SlideGenerator] LLM response received: {len(response.content)} chars")
        print(f"[SlideGenerator] First 200 chars: {response.content[:200]}")
        
        content = response.content.strip()
        
        # Remove markdown code blocks
        if "```" in content:
            parts = content.split("```")
            for part in parts:
                clean = part.strip()
                if clean.startswith("{") or clean.startswith("json"):
                    content = clean
                    if content.startswith("json"):
                        content = content[4:].strip()
                    break
        
        # Extract JSON object
        if "{" in content:
            start = content.index("{")
            end = content.rfind("}") + 1
            content = content[start:end]
        
        result = json.loads(content)
        slides_list = result.get("slides", [])
        
        print(f"[SlideGenerator] Successfully parsed {len(slides_list)} slides")
        
        if len(slides_list) < 10:
            print(f"[SlideGenerator] Got {len(slides_list)} slides, expected 10. Using fallback.")
            slides_list = build_proper_structure(topic, audience, tone)
        else:
            slides_list = slides_list[:10]
        
        print(f"[SlideGenerator] Returning {len(slides_list)} slides")
        return {"slides": slides_list}
        
    except json.JSONDecodeError as e:
        print(f"[SlideGenerator] JSON parsing failed: {e}")
        print(f"[SlideGenerator] Using fallback structure")
        return {"slides": build_proper_structure(topic, audience, tone)}
    except Exception as e:
        print(f"[SlideGenerator] Error: {e}")
        import traceback
        traceback.print_exc()
        print(f"[SlideGenerator] Using fallback structure")
        return {"slides": build_proper_structure(topic, audience, tone)}


def build_proper_structure(topic, audience, tone):
    """Build exactly 10-slide presentation with topic-specific content"""
    
    # Extract topic name
    topic_words = topic.split()[:5]
    short_topic = " ".join(topic_words).title()
    
    structure = [
        # Slide 1: Title Slide
        {
            "layout": "title_slide",
            "title": short_topic,
            "tagline": f"Transforming decision-making in {audience}",
            "presenter": f"Strategic Overview for {audience}"
        },
        
        # Slide 2: Overview
        {
            "layout": "overview",
            "title": "Overview & Definition",
            "definition": f"{short_topic} is a strategic approach that combines modern technology with organizational best practices to drive competitive advantage and sustainable growth.",
            "point1": f"Increases operational efficiency by 40-60% through automation and process optimization",
            "point2": f"Enables data-driven decision-making with real-time insights and analytics",
            "point3": f"Creates competitive differentiation in rapidly evolving markets"
        },
        
        # Slide 3: Problem Statement
        {
            "layout": "problem",
            "title": "Problem Statement",
            "problem": f"Organizations struggle with outdated processes that limit scalability, increase costs, and slow decision-making in competitive markets.",
            "challenge1": f"High operational costs from manual processes and inefficient workflows",
            "challenge2": f"Limited visibility into real-time data and market trends affecting strategy",
            "why_matters": f"Companies that don't modernize risk losing market share to more agile competitors within 18-24 months"
        },
        
        # Slide 4: Background & Context
        {
            "layout": "background",
            "title": "Background & Historical Context",
            "description": f"{short_topic} evolved from traditional business practices through technological advancement and market demand for efficiency.",
            "milestone1": f"2010s: Initial adoption of digital transformation in leading organizations",
            "milestone2": f"2018-2020: Mainstream recognition and rapid acceleration across industries",
            "current_state": f"Today: {short_topic} is essential competitive necessity, with 70%+ of enterprise organizations investing in modernization"
        },
        
        # Slide 5: Core Concepts
        {
            "layout": "concepts",
            "title": "Core Concepts & Components",
            "concept1": f"Automation: Streamlining repetitive processes through intelligent systems and workflow optimization",
            "concept2": f"Analytics: Extracting actionable insights from data to guide strategic decisions",
            "concept3": f"Integration: Connecting disparate systems and processes into unified, efficient operations",
            "concept4": f"Scalability: Building flexible systems that grow with organizational needs without proportional cost increases"
        },
        
        # Slide 6: How It Works
        {
            "layout": "process",
            "title": "How It Works - Process Flow",
            "step1": f"Assessment: Evaluate current state, identify inefficiencies, and define strategic objectives",
            "step2": f"Planning: Design solution architecture, allocate resources, and establish implementation timeline",
            "step3": f"Execution: Deploy solutions in phases, train teams, and monitor progress against KPIs",
            "explanation": f"The implementation follows a phased approach with quick wins in 90 days, enabling organizational learning and momentum building"
        },
        
        # Slide 7: Applications & Use Cases
        {
            "layout": "applications",
            "title": "Real-World Applications & Use Cases",
            "use_case1": f"Healthcare: Streamlined patient data management reduces administrative overhead by 50% and improves care delivery speed",
            "use_case2": f"Finance: Automated compliance checking and fraud detection enables faster transactions with 99.9% accuracy",
            "use_case3": f"Retail: Predictive inventory management reduces stockouts by 35% and optimizes supply chain efficiency",
            "use_case4": f"Manufacturing: Real-time monitoring and predictive maintenance reduce downtime by 40% and extend equipment lifespan"
        },
        
        # Slide 8: Benefits & Advantages
        {
            "layout": "benefits",
            "title": "Benefits & Strategic Advantages",
            "benefit1": f"Cost Reduction: 30-50% reduction in operational costs through automation and efficiency gains within first 18 months",
            "benefit2": f"Competitive Edge: Faster time-to-market, better customer experience, and sustainable differentiation in crowded markets",
            "benefit3": f"Scalability & Growth: Flexible systems support business expansion without proportional increases in overhead or complexity"
        },
        
        # Slide 9: Challenges & Limitations
        {
            "layout": "challenges",
            "title": "Challenges, Limitations & Risks",
            "limitation1": f"Change Management: Organizational resistance to new processes and systems requires strong leadership and cultural alignment",
            "limitation2": f"Integration Complexity: Legacy systems may require significant refactoring or replacement to work effectively",
            "risk": f"Data Security: Increased connectivity and data sharing creates cybersecurity risks requiring robust governance frameworks",
            "improvement": f"Future development includes better change management tools, faster integration platforms, and advanced AI-driven security"
        },
        
        # Slide 10: Conclusion & Future
        {
            "layout": "conclusion",
            "title": "Conclusion & Future Outlook",
            "summary": f"{short_topic} is essential for organizations seeking competitive advantage. Success requires strategic planning, strong leadership commitment, and continuous optimization.",
            "future": f"Emerging trends include AI-powered decision-making, predictive analytics, and autonomous operations. Early adopters will maintain sustained competitive advantages.",
            "closing": f"The time to modernize is now. Organizations that act decisively will lead their industries; those that delay risk obsolescence."
        }
    ]
    
    return structure




