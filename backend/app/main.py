from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from persistence.database import get_db
from .api import Doc
from .auth import get_current_user

app = FastAPI()

# Security headers middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize supabase client
supabase = get_db()


@app.get("/api/docs")
def get_docs(user: dict = Depends(get_current_user)) -> list[Doc]:
    try:
        response = supabase.table("docs").select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
