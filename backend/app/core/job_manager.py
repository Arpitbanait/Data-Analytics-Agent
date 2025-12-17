import redis
import json
from typing import Optional
from app.core.config import settings

redis_client = redis.from_url(
    settings.REDIS_URL,
    decode_responses=True
)

def create_job(job_id: str, payload: dict):
    redis_client.hset(
        f"job:{job_id}",
        mapping={
            "status": "pending",
            "progress": "0",
            "data": json.dumps(payload),
        },
    )
    redis_client.expire(f"job:{job_id}", 86400)


def update_job(job_id: str, status: str, progress: int, result: dict | None = None):
    data = {
        "status": status,
        "progress": str(progress),
    }
    if result:
        data["result"] = json.dumps(result)

    redis_client.hset(f"job:{job_id}", mapping=data)


def get_job_data(job_id: str) -> Optional[dict]:
    raw = redis_client.hgetall(f"job:{job_id}")
    if not raw:
        return None

    return {
        "status": raw.get("status"),
        "progress": int(raw.get("progress", 0)),
        "data": json.loads(raw["data"]) if "data" in raw else None,
        "result": json.loads(raw["result"]) if "result" in raw else None,
    }


def save_analysis(analysis_id: str, results: dict):
    redis_client.set(
        f"analysis:{analysis_id}",
        json.dumps(results),
        ex=86400,
    )


def get_analysis(analysis_id: str) -> Optional[dict]:
    data = redis_client.get(f"analysis:{analysis_id}")
    return json.loads(data) if data else None
