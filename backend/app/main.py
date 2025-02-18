from fastapi import FastAPI, HTTPException, Depends
from persistence.database import get_db
from .api import Doc
from .auth import get_current_user

app = FastAPI()


# Initialize supabase client
supabase = get_db()


@app.get("/api/docs")
def get_docs(user: dict = Depends(get_current_user)) -> list[Doc]:
    try:
        response = supabase.table("docs").select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
