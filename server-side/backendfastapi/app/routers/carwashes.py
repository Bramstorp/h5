from http.client import CannotSendRequest
from socket import CAN_EFF_FLAG
import string
from traceback import print_tb
from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from typing import List
import hashlib

from ..models.carwashes import Carwash
from ..schemas.carwashes import Carwash_Pydantic, CarwashIn_Pydantic

app = FastAPI()

router = APIRouter(
    tags=["carwashes"],
    responses={404: {"description": "Not found"}},
)

#Create carwash
@router.post('/carwash', response_model=Carwash_Pydantic)
async def create_carwash(carwash: CarwashIn_Pydantic):
    carwash_obj = await Carwash.create(**carwash.dict(exclude_unset=True))
    return await Carwash_Pydantic.from_tortoise_orm(carwash_obj)

#Get carwash from id
@router.get('/carwash/{carwash_id}', response_model=Carwash_Pydantic)
async def get_carwash(carwash_id: int):
    return await Carwash.get(id=carwash_id)

#Get carwah from name
@router.get('/carwash', response_model=Carwash_Pydantic)
async def get_carwash(carwash_name: str):
    return await Carwash.get(name=carwash_name)

#Get all carwashes
@router.get('/carwashes', response_model=List[Carwash_Pydantic])
async def get_carwashes():
    return await Carwash_Pydantic.from_queryset(Carwash.all())  

#Pause carwash
@router.put('/carwash/', response_model=Carwash_Pydantic)
async def update_carwash(carwash_id: int, carwash_status: str):
    await Carwash.filter(id=carwash_id).update({"status": carwash_status})
    return await Carwash_Pydantic.from_queryset_single(Carwash.get(id=carwash_id))

#Start carwash
@router.put('/carwash/{carwash_id}', response_model=Carwash_Pydantic)
async def get_carwash(carwash_id: int):
    return await Carwash.get(id=carwash_id)

