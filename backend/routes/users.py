from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models import User
from schemas import UserCreate, UserLogin
from auth import hash_password, verify_password


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()



# REGISTER USER

@router.post("/register")
def register(
    data: UserCreate,
    db: Session = Depends(get_db)
):

    existing = db.query(User).filter(
        User.username == data.username
    ).first()


    if existing:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )


    user = User(
        username=data.username,
        password=hash_password(
            data.password
        )
    )


    db.add(user)
    db.commit()
    db.refresh(user)


    return {
        "message":"Account created",
        "user_id":user.id
    }



# LOGIN USER

@router.post("/login")
def login(
    data: UserLogin,
    db: Session = Depends(get_db)
):

    user=db.query(User).filter(
        User.username==data.username
    ).first()


    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )



    if not verify_password(
        data.password,
        user.password
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )


    return {

        "message":"Login successful",

        "user":{
            "id":user.id,
            "username":user.username
        }

    }