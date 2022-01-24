from tortoise.contrib.pydantic import pydantic_model_creator
from ..models.cars import Car

Car_Pydantic = pydantic_model_creator(Car, name='Car')
CarIn_Pydantic = pydantic_model_creator(Car, name='CarIn', exclude_readonly=True)