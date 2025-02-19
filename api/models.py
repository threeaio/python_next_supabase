from pydantic import BaseModel


class Doc(BaseModel):
    id: int
    title: str
    created_at: str


class DocCreate(BaseModel):
    title: str
