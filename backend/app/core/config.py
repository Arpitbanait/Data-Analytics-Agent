from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # -----------------------------
    # Infrastructure
    # -----------------------------
    REDIS_URL: str = "redis://localhost:6379"
    UPLOAD_DIR: str = "./uploads"

    # -----------------------------
    # Anthropic (Claude) LLM
    # -----------------------------
    ANTHROPIC_API_KEY: str = ""  # Set in .env file
    ANTHROPIC_MODEL: str = "claude-3-haiku-20240307"
    ANTHROPIC_MAX_TOKENS: int = 1024

    class Config:
        env_file = ".env"


settings = Settings()

