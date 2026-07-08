from pydantic import BaseModel


# ---------- USER SCHEMAS ----------

class UserCreate(BaseModel):
    username: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    id: int
    username: str

    class Config:
        from_attributes = True



# ---------- PROGRESS SCHEMAS ----------

class ProgressCreate(BaseModel):
    user_id: int
    algorithm: str


class ProgressResponse(BaseModel):
    id: int
    user_id: int
    algorithm: str
    attempts: int

    class Config:
        from_attributes = True