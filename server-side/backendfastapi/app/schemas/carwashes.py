from tortoise.contrib.pydantic import pydantic_model_creator
from ..models.carwashes import Carwash

Carwash_Pydantic = pydantic_model_creator(Carwash, name='Carwash')
CarwashIn_Pydantic = pydantic_model_creator(Carwash, name='Carwashin', exclude_readonly=True)