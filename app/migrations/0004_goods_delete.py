# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2019-03-16 07:50
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_goods'),
    ]

    operations = [
        migrations.AddField(
            model_name='goods',
            name='delete',
            field=models.IntegerField(default=0),
        ),
    ]
