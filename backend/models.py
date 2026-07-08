from sqlalchemy import Column,Integer,String,ForeignKey
from database import Base


class User(Base):
    __tablename__="users"

    id=Column(Integer,primary_key=True,index=True)
    username=Column(String,unique=True)
    password=Column(String)


class Progress(Base):
    __tablename__="progress"

    id=Column(Integer,primary_key=True)

    algorithm=Column(String)

    attempts=Column(Integer,default=1)

    user_id=Column(
        Integer,
        ForeignKey("users.id")
    )