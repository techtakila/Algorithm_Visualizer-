from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Progress
from schemas import ProgressCreate


router = APIRouter(
    prefix="/progress",
    tags=["Progress"]
)



def get_db():

    db=SessionLocal()

    try:
        yield db

    finally:
        db.close()




# SAVE ALGORITHM PROGRESS

@router.post("/save")
def save_progress(
    data:ProgressCreate,
    db:Session=Depends(get_db)
):


    progress=Progress(

        user_id=data.user_id,

        algorithm=data.algorithm

    )


    db.add(progress)

    db.commit()

    db.refresh(progress)


    return {

        "message":"Progress saved",

        "progress":progress

    }



# GET USER PROGRESS


@router.get("/{user_id}")
def get_progress(

    user_id:int,

    db:Session=Depends(get_db)

):


    data=db.query(
        Progress
    ).filter(

        Progress.user_id==user_id

    ).all()


    return data