from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    password = models.CharField(max_length=256)

    class Meta:
        db_table = 'bbw_user'