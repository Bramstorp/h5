from email.policy import default
from tortoise.models import Model 
from tortoise import fields


status =  ["FREE", "RUNNING", "STOPPED", "ERROR"]

class Carwash(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(50)
    status = fields.CharField(50, default="FREE")
    time = fields.CharField(10, default="0,0")
    #user = fields.ForeignKeyField("models.User", related_name="user")