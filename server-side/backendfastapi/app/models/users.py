from tortoise.models import Model
from tortoise import fields

class User(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(100)
    password = fields.CharField(100)
    username = fields.CharField(100)
    is_subscribed = fields.BooleanField(False)
