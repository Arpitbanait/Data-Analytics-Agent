# Data Analytics Agent

AI-powered data analysis platform with FastAPI backend and React frontend.

## What This Project Does

- Upload CSV/Excel data and run automated EDA
- Generate charts and data insights
- Store analysis jobs in backend job storage
- Support user auth flow (JWT-based backend endpoints)

## Tech Stack

- Backend: FastAPI, Pandas, NumPy, SQLAlchemy
- Frontend: React, TypeScript, Vite, Tailwind CSS
- AI/LLM: Anthropic integrations

## Project Structure

```text
Data-Analytics-Agent/
|- backend/
|  |- app/
|  |  |- agents/
|  |  |- core/
|  |  |- models/
|  |  |- routers/
|  |  `- main.py
|  |- requirements.txt
|  `- .env.example
|- data-weaver-ai/
|  |- src/
|  `- package.json
`- README.md
```

## Local Setup

### 1. Clone

```bash
git clone https://github.com/Arpitbanait/Data-Analytics-Agent.git
cd Data-Analytics-Agent
```

### 2. Backend

```bash
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate
# Install dependencies
pip install -r requirements.txt
```

Create backend environment file:

```bash
copy .env.example .env
```

Set at least:

```env
ANTHROPIC_API_KEY=your_key_here
JWT_SECRET=your_strong_secret_here
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24
DATABASE_URL=sqlite:///./data.db
```

Run backend:

```bash
uvicorn app.main:app --reload
```

Backend URL: http://localhost:8000
API docs: http://localhost:8000/docs

### 3. Frontend

```bash
cd ..\data-weaver-ai
npm install
npm run dev
```

Frontend URL: http://localhost:5173

## Notes

- Keep `.env` out of git.
- For production, use PostgreSQL/MySQL instead of SQLite.
- Use a strong JWT secret in production.

## License

MIT
