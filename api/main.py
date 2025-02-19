from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from api.persistence.database import get_db
from api.models import Doc, DocCreate
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

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


@app.get("/api/data")
def get_docs(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> list[Doc]:
    try:
        supabase.auth.set_session(credentials.credentials, "")
        response = supabase.table("docs").select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/data", response_model=Doc)
def create_doc(
    doc: DocCreate,
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> Doc:
    try:
        supabase.auth.set_session(credentials.credentials, "")
        response = supabase.table("docs").insert({"title": doc.title}).execute()
        print("response", response.data[0])
        return response.data[0]
    except Exception as e:
        print("Error details:", str(e))  # Log the full error
        print("Error type:", type(e).__name__)
        raise HTTPException(status_code=500, detail=str(e))
