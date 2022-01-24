import string
from traceback import print_tb
from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from typing import List
import hashlib

from ..models.users import User
from ..schemas.users import User_Pydantic, UserIn_Pydantic

app = FastAPI()

router = APIRouter(
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

#Login
@router.post('/login')
async def login(username: str, password: str):
    #Get User from DB

    #Hash Password
    hashedPassword = hashlib.sha256(password.encode()).hexdigest()
    
    #Match passwords

    #return correct statuscode
    return

#Create User
@router.post('/user', response_model=User_Pydantic)
async def create_user(user: UserIn_Pydantic):

    #Create User
    user_obj = await User.create(**user.dict(exclude_unset=True))

    #save to DB

    return await User_Pydantic.from_tortoise_orm(user_obj)

