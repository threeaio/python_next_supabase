import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")


def get_db() -> Client:
    if not url or not key:
        raise ValueError("SUPABASE_URL and SUPABASE_KEY must be set")
    supabase: Client = create_client(url, key)
    return supabase
