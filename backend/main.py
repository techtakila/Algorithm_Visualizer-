from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base
from routes import users, progress


app = FastAPI(
    title="Algorithm Visualizer API"
)


app.add_middleware(

    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_methods=["*"],

    allow_headers=["*"]

)



Base.metadata.create_all(engine)



app.include_router(
    users.router
)

app.include_router(
    progress.router
)



@app.get("/")
def home():

    return {

        "message":
        "Algorithm Visualizer Backend Running"

    }