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
async def login(user: User):
    current_user = user.dict()
    print("@@@@@@@@@@@@@@@@@@@@@@@@")
    print(current_user)
    print("@@@@@@@@@@@@@@@@@@@@@@@@")
    #Get User from DB
    #user = User_Pydantic.from_queryset_single(User.get(username=username))
    #Hash Password
    #hashedPassword = hashlib.sha256(password.encode()).hexdigest()
    
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

#Get User from id
@router.get('/user/{user_id}', response_model=User_Pydantic)
async def get_user(user_id: int):
    return await User_Pydantic.from_queryset_single(User.get(id=user_id))

#Get User from username
@router.get('/user/{user_username}', response_model=User_Pydantic)
async def get_user(user_username: str):
    return await User_Pydantic.from_queryset_single(User.get(id=user_username))
