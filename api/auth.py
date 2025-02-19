from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase.client import Client
from api.persistence.database import get_db

security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> dict:
    supabase: Client = get_db()

    try:
        # Verify the JWT token with Supabase
        response = supabase.auth.get_user(credentials.credentials)
        return response.user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


async def add_current_user_to_supabase(
    supabase: Client,
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    supabase.auth.set_session(credentials.credentials, "")
