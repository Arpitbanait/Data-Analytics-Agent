<<<<<<< HEAD
# Analytics Pro .ai

AI-Powered Data Analysis and Visualization Platform that transforms your data into actionable insights using Claude AI.

![Analytics Pro](https://img.shields.io/badge/AI-Powered-blue)
![Python](https://img.shields.io/badge/Python-3.9+-green)
![React](https://img.shields.io/badge/React-18-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-teal)

## 🚀 Features

- **📊 Automated EDA**: Comprehensive exploratory data analysis with intelligent pattern detection
- **🎨 Vibrant Visualizations**: 12-color palette with interactive Plotly charts (histograms, scatter plots, heatmaps, etc.)
- **🤖 AI-Powered Insights**: Claude AI generates human-readable insights from your data
- **💾 Multiple Data Sources**: Upload CSV/Excel files or connect directly to MySQL/PostgreSQL databases
- **🔄 Multi-User Support**: User-isolated analyses with localStorage-based session management
- **📈 Interactive Dashboards**: View and manage all your analyses in one place
- **💻 Python Code Export**: Export analysis code for reproducibility
- **🌈 Modern UI**: Beautiful React interface with Tailwind CSS and shadcn/ui components

## 🛠️ Tech Stack

### Backend
- **FastAPI** - High-performance Python web framework
- **Pandas & NumPy** - Data manipulation and analysis
- **Plotly** - Interactive visualizations
- **SQLAlchemy** - Database connectivity
- **Anthropic Claude AI** - Natural language insights generation

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful UI components
- **React Router** - Client-side routing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.9+** ([Download](https://www.python.org/downloads/))
- **Node.js 18+** ([Download](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **Anthropic API Key** ([Get one here](https://console.anthropic.com/))

## 📥 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Arpitbanait/Data-Analytics-Agent.git
cd Data-Analytics-Agent
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
# Copy the example file
cp .env.example .env
```

Edit `backend/.env` and add your Anthropic API key:

```env
ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
ANTHROPIC_MODEL=claude-3-haiku-20240307
ANTHROPIC_MAX_TOKENS=1024
REDIS_URL=redis://localhost:6379
UPLOAD_DIR=./uploads
```

**⚠️ Important**: Get your API key from [Anthropic Console](https://console.anthropic.com/)

### 4. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd data-weaver-ai

# Install dependencies
npm install
# or
yarn install
```

## 🚀 Running the Application

You need to run **both backend and frontend** in separate terminal windows.

### Terminal 1: Start Backend Server

```bash
# From project root
cd backend

# Activate virtual environment if not already activated
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Start FastAPI server
uvicorn app.main:app --reload
```

Backend will run on: **http://localhost:8000**

API Documentation: **http://localhost:8000/docs**

### Terminal 2: Start Frontend Development Server

```bash
# From project root
cd data-weaver-ai

# Start Vite dev server
npm run dev
# or
yarn dev
```

Frontend will run on: **http://localhost:5173**

## 🎯 Usage

1. **Open your browser** and navigate to `http://localhost:5173`

2. **Upload Data**:
   - Click "Get Started" or navigate to Upload page
   - Choose between:
     - **File Upload**: Drag & drop CSV/Excel files
     - **Database Connection**: Connect to MySQL/PostgreSQL

3. **Run Analysis**:
   - Backend automatically performs EDA
   - Generates interactive charts with vibrant colors
   - Claude AI creates natural language insights

4. **View Results**:
   - See statistics, charts, and AI insights
   - Export Python code for reproducibility
   - Access all analyses from Dashboard

5. **Multi-User Support**:
   - Each browser session gets a unique user ID
   - Analyses are isolated per user
   - Open in incognito for separate user experience

## 📁 Project Structure

```
Data-Analytics-Agent/
├── backend/
│   ├── app/
│   │   ├── agents/           # AI agents (EDA, Charts, Insights)
│   │   │   ├── eda_agent.py
│   │   │   ├── chart_agent.py
│   │   │   └── insight_agent.py
│   │   ├── core/             # Core configuration
│   │   │   ├── config.py
│   │   │   └── job_manager_file.py
│   │   ├── routers/          # API endpoints
│   │   │   ├── upload.py
│   │   │   ├── analyze.py
│   │   │   ├── charts.py
│   │   │   ├── insights.py
│   │   │   ├── connect.py
│   │   │   └── status.py
│   │   └── main.py           # FastAPI application
│   ├── jobs_data/            # Analysis storage
│   ├── requirements.txt
│   ├── .env.example
│   └── .env                  # Your API keys (create this)
│
├── data-weaver-ai/
│   ├── src/
│   │   ├── api/              # Backend API calls
│   │   ├── components/       # React components
│   │   │   ├── ui/           # shadcn/ui components
│   │   │   ├── layout/       # Navbar, Footer
│   │   │   └── landing/      # Landing page sections
│   │   ├── pages/            # Route pages
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Upload.tsx
│   │   │   ├── AnalysisWorkspace.tsx
│   │   │   └── Analyses.tsx
│   │   ├── lib/              # Utilities
│   │   │   └── userSession.ts # User ID management
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```

## 🎨 Key Features in Detail

### Vibrant 12-Color Palette
Charts use a carefully selected color palette:
```
#FF6B6B, #4ECDC4, #45B7D1, #FFA07A, #98D8C8,
#F7DC6F, #BB8FCE, #85C1E2, #F8B739, #52B788,
#E74C3C, #3498DB
```

### AI Insights
- Powered by Claude 3 Haiku
- Generates actionable insights from statistical patterns
- Natural language explanations of data trends

### Multi-User Isolation
- localStorage-based user identification
- Each session maintains separate analyses
- No cross-user data leakage

### Database Support
- MySQL and PostgreSQL connections
- SQLAlchemy reflection for automatic table discovery
- Direct data loading from database tables

## 🔧 Configuration Options

### Backend Configuration (`backend/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `ANTHROPIC_API_KEY` | Required | Your Anthropic API key |
| `ANTHROPIC_MODEL` | claude-3-haiku-20240307 | Claude model to use |
| `ANTHROPIC_MAX_TOKENS` | 1024 | Max tokens for AI responses |
| `REDIS_URL` | redis://localhost:6379 | Redis connection (optional) |
| `UPLOAD_DIR` | ./uploads | File upload directory |

## 🐛 Troubleshooting

### Backend Issues

**Problem**: `ModuleNotFoundError: No module named 'app'`
```bash
# Ensure you're in the backend directory
cd backend
# Activate virtual environment
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux
```

**Problem**: `anthropic.AuthenticationError`
```bash
# Check your .env file has valid API key
# Make sure .env is in backend/ directory
# Restart the server after changing .env
```

**Problem**: Database connection fails
```bash
# Check your connection string format:
# MySQL: mysql+pymysql://user:password@host:port/database
# PostgreSQL: postgresql://user:password@host:port/database
```

### Frontend Issues

**Problem**: `Cannot connect to backend`
```bash
# Ensure backend is running on port 8000
# Check CORS settings in backend/app/main.py
# Verify backend URL in data-weaver-ai/src/api/backend.ts
```

**Problem**: `npm install` fails
```bash
# Try removing node_modules and package-lock.json
rm -rf node_modules package-lock.json
npm install
```

## 🔐 Security Notes

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Rotate API keys** if accidentally exposed
3. **Use environment variables** for all secrets
4. **For production**: Implement proper authentication (Supabase Auth recommended)

## 📚 API Endpoints

Access interactive API docs at `http://localhost:8000/docs`

Key endpoints:
- `POST /upload` - Upload CSV/Excel files
- `POST /analyze` - Start EDA analysis
- `GET /charts/{analysis_id}` - Get generated charts
- `GET /insights/{analysis_id}` - Get AI insights
- `POST /connect-db` - Connect to database
- `GET /status/analyses` - List all analyses

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Arpit Banait**
- GitHub: [@Arpitbanait](https://github.com/Arpitbanait)

## 🙏 Acknowledgments

- [Anthropic](https://www.anthropic.com/) for Claude AI
- [FastAPI](https://fastapi.tiangolo.com/) for the amazing framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Plotly](https://plotly.com/) for interactive visualizations

---

⭐ If you find this project helpful, please give it a star on GitHub!

**Built with ❤️ using Claude AI**
=======
# PPT Generator

A full-stack application for generating professional PowerPoint presentations using AI.

## Project Structure

```
ppt_generator/
├── backend/          # Python FastAPI backend
├── frontend/         # React + TypeScript frontend
├── README.md         # This file
└── .gitignore        # Git configuration
```

## Prerequisites

- **Python 3.8+** (for backend)
- **Node.js 16+** (for frontend)
- **npm** or **yarn** (for frontend package management)
- **Anthropic API Key** (required for AI-powered slide generation)

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
ANTHROPIC_API_KEY=your_api_key_here
```

**How to Get Your API Key:**
1. Visit [https://console.anthropic.com/](https://console.anthropic.com/)
2. Sign up or log in to your account
3. Navigate to the API Keys section
4. Create a new API key
5. Copy the key and paste it into your `.env` file

### 3. Run the Backend Server

```bash
python -m uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Running the Full Application

**Terminal 1 - Backend:**
```bash
cd backend
python -m uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Then open your browser and navigate to `http://localhost:5173/`

## Features

- Generate presentations from topic input
- Support for multiple slide types
- AI-powered content generation
- Responsive web interface
- Export presentations as PowerPoint files

## API Documentation

Once the backend is running, view the API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Troubleshooting

### Backend Issues
- Ensure Python 3.8+ is installed: `python --version`
- Check that all dependencies are installed: `pip list`
- Verify your `.env` file is in the `backend/` directory

### Frontend Issues
- Ensure Node.js 16+ is installed: `node --version`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check that the backend server is running on port 8000

## License

MIT
>>>>>>> bf6c773 (first commit)
