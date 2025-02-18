# Production startup command (save as start-prod.sh)
uvicorn app.main:app --host 127.0.0.1 --port 8000 --workers 4 --log-level warning
