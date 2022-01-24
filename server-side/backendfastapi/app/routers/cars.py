from fastapi import FastAPI, Depends, HTTPException, status, APIRouter

from ..models.cars import Car
from ..schemas.cars import CarIn_Pydantic, Car_Pydantic


app = FastAPI()

router = APIRouter(
    tags=["cars"],
    responses={404: {"description": "Not found"}},
)


@router.post('/car', response_model=Car_Pydantic)
async def create_car(car: CarIn_Pydantic):
    car_obj = Car()
    await car_obj.save()
    return await Duck_Pydantic.from_tortoise_orm(car_obj)
