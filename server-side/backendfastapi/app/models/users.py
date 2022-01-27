from typing import Optional
from tortoise.models import Model
from tortoise import fields
from passlib.hash import bcrypt

class User(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(100)
    password_hash = fields.CharField(100)
    username = fields.CharField(100, unique=True)
    is_subscribed = fields.BooleanField(default=False)
    is_admin = fields.BooleanField(default=False)
    
    def verify_password(self, password):
        return bcrypt.verify(password, self.password_hash)