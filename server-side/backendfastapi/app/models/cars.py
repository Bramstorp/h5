from tortoise.models import Model 
from tortoise import fields 


class Car(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(50)