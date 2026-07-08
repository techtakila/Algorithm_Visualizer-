from fastapi import FastAPI,Depends
from sqlalchemy.orm import Session
from database import *
from models import *
from auth import *
from fastapi.middleware.cors import CORSMiddleware


app=FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_methods=["*"],
    allow_headers=["*"]
)


Base.metadata.create_all(engine)


@app.post("/register")
def register(
    username:str,
    password:str,
    db:Session=Depends(lambda:SessionLocal())
):
    user=User(
        username=username,
        password=hash_password(password)
    )

    db.add(user)
    db.commit()

    return {
        "message":"registered"
    }


@app.post("/login")
def login(
    username:str,
    password:str,
    db:Session=Depends(lambda:SessionLocal())
):

    user=db.query(User).filter(
        User.username==username
    ).first()


    if not user:
        return {
            "error":"user not found"
        }


    if not verify_password(
        password,
        user.password
    ):
        return {
            "error":"wrong password"
        }


    return {
        "message":"login success",
        "user_id":user.id
    }



@app.post("/progress")
def save_progress(
    user_id:int,
    algorithm:str,
    db:Session=Depends(lambda:SessionLocal())
):

    data=Progress(
        user_id=user_id,
        algorithm=algorithm
    )

    db.add(data)
    db.commit()

    return {
        "saved":True
    }



@app.get("/progress/{user_id}")
def get_progress(
    user_id:int,
    db:Session=Depends(lambda:SessionLocal())
):

    return db.query(
        Progress
    ).filter(
        Progress.user_id==user_id
    ).all()