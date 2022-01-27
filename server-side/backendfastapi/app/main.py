from fastapi import FastAPI, WebSocket, Request
from tortoise.contrib.fastapi import register_tortoise
from tortoise import Tortoise
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from .routers import cars
from .routers import users
from .routers import carwashes
from .models.carwashes import Carwash
from .schemas.carwashes import Carwash_Pydantic

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cars.router)
app.include_router(users.router)
app.include_router(carwashes.router)

@app.get("/")
async def root():
    return "Home"

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    print('Accepting client connection...')
    await websocket.accept()
    while True:
        try:
            # Wait for any message from the client
            data=await websocket.receive_text()
            print(data)
            # Send message to the client
            test = list[Carwash.all()]
            print(test)
            data = {
                "test": "test"
            }
            await websocket.send_json(data)
            print("Sending")
        except Exception as e:
            print('error:', e)
            break
    print('Bye..')

Tortoise.init_models(['app.models.cars', 'app.models.users', 'app.models.carwashes'], 'models')

register_tortoise(
    app, 
    db_url='sqlite://db.sqlite3',
    modules={
        'models': [
            'app.models.cars',
            'app.models.users',
            'app.models.carwashes'
        ],
    },
    generate_schemas=True,
    add_exception_handlers=True,
)