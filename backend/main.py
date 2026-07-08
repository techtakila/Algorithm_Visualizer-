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
    
@app.get("../src/algorithms")
@app.get("/algorithms")
 
def algorithms():

    return [
        {
            "id":"bubble-sort",
            "name":"Bubble Sort",
            "category":"Sorting"
        },
        {
            "id":"merge-sort",
            "name":"Merge Sort",
            "category":"Sorting"
        },
        {
            "id":"quick-sort",
            "name":"Quick Sort",
            "category":"Sorting"
        },
        {
            "id":"binary-search",
            "name":"Binary Search",
            "category":"Searching"
        },
        {
            "id":"nqueens",
            "name":"N Queens",
            "category":"Backtracking"
        }
    ]