from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from typing import List

from ..models.cars import Car
from ..schemas.cars import CarIn_Pydantic, Car_Pydantic


app = FastAPI()

router = APIRouter(
    tags=["cars"],
    responses={404: {"description": "Not found"}},
)


@router.post('/car', response_model=Car_Pydantic)
async def create_car(car: CarIn_Pydantic):
    car_obj = await Car.create(**car.dict(exclude_unset=True))
    return await Car_Pydantic.from_tortoise_orm(car_obj)

@router.get('/cars', response_model=List[Car_Pydantic])
async def get_cars():
    return await Car_Pydantic.from_queryset(Car.all())  

@router.get('/car/{car_id}', response_model=Car_Pydantic)
async def get_car(car_id: int):
    return await Car_Pydantic.from_queryset_single(Car.get(id=car_id))