from tortoise.contrib.pydantic import pydantic_model_creator
from ..models.users import User

User_Pydantic = pydantic_model_creator(User, name='User')
UserIn_Pydantic = pydantic_model_creator(User, name='Userin', exclude_readonly=True)