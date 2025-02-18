import sys
from pathlib import Path

# Add backend directory to Python path
backend_path = str(Path(__file__).parent.parent / "backend")
if backend_path not in sys.path:
    sys.path.append(backend_path)

# Import the actual application
from app.main import app

# This is required for Vercel - do not remove
from fastapi import FastAPI

app = app
