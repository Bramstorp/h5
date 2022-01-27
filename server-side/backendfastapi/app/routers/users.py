import jwt

from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.hash import bcrypt

from ..models.users import User
from ..schemas.users import UserIn_Pydantic, User_Pydantic


app = FastAPI()

router = APIRouter(
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

JWT_SECRET = 'myjwtsecret'

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')

async def authenticate_user(username: str, password: str):
    user = await User.get(username=username)
    if not user:
        return False 
    if not user.verify_password(password):
        return False
    return user 

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        user = await User.get(id=payload.get('id'))
    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail='Invalid username or password'
        )
    return await User_Pydantic.from_tortoise_orm(user)

@router.post('/token')
async def generate_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail='Invalid username or password'
        )
    user_obj = await User_Pydantic.from_tortoise_orm(user)
    token = jwt.encode(user_obj.dict(), JWT_SECRET)
    return {'access_token' : token, 'token_type' : 'bearer'}


@router.post('/users', response_model=User_Pydantic)
async def create_user(user: UserIn_Pydantic):
    user_obj = User(**user.dict(exclude_unset=True))
    user_obj.password_hash = bcrypt.hash(user.password_hash)
    await user_obj.save()
    return await User_Pydantic.from_tortoise_orm(user_obj)

@router.get('/users/me', response_model=User_Pydantic)
async def get_user(user: User_Pydantic = Depends(get_current_user)):
    return user 