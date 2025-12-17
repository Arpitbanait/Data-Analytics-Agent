from celery import shared_task
from anthropic import Anthropic
from app.core.config import settings

client = Anthropic(api_key=settings.ANTHROPIC_API_KEY)


@shared_task
def generate_sql(schema: dict, question: str):
    prompt = f"""
You are a senior data analyst.

Database schema:
{schema}

User question:
{question}

Return ONLY valid SQL.
"""

    response = client.messages.create(
        model="claude-3-haiku-20240307",
        max_tokens=400,
        messages=[{"role": "user", "content": prompt}]
    )

    return response.content[0].text
