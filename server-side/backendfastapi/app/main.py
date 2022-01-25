from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
from tortoise import Tortoise
from fastapi.middleware.cors import CORSMiddleware

from .routers import cars
from .routers import users
from .routers import carwashes

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