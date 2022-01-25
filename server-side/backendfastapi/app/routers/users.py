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

    auth = ""
    #Get User from DB
    user = await User.get(username=username)
    if not user:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail="der skete en fejl"
        )
    #Hash incomming Password
    hashedPassword = hashlib.sha256(password.encode()).hexdigest()

    #Match paswords with user from db
    if hashedPassword == user.password:
        auth == "OK"
    else:
        auth == "FALSE"

    return {"AUTH": auth}

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
    return await User.get(id=user_id)

#Get User from username
@router.get('/user', response_model=User_Pydantic)
async def get_user(user_username: str):
    return await User.get(username=user_username)
