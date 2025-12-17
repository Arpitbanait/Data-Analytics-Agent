from celery import Celery

celery_app = Celery(
    "dataviz_worker",
    broker="memory://",
    backend="cache+memory://",
    include=[
        "app.agents.eda_agent",
        "app.agents.chart_agent",
        "app.agents.insight_agent",
        "app.agents.file_processor",
    ],
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_always_eager=True,
    task_eager_propagates=True,
    task_time_limit=300,      # 5 minutes per task
    worker_prefetch_multiplier=1,
    result_expires=3600,      # 1 hour
)

celery_app.conf.task_routes = {
    "app.agents.eda_agent.*": {"queue": "analysis"},
    "app.agents.chart_agent.*": {"queue": "charts"},
    "app.agents.insight_agent.*": {"queue": "insights"},
}
