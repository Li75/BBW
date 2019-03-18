# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2019-03-16 07:47
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_auto_20190314_1114'),
    ]

    operations = [
        migrations.CreateModel(
            name='Goods',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img', models.CharField(max_length=100)),
                ('num', models.CharField(max_length=40)),
                ('price', models.IntegerField()),
                ('dels', models.IntegerField()),
                ('today', models.CharField(max_length=40)),
                ('word', models.CharField(max_length=40)),
            ],
            options={
                'db_table': 'bbw_goods',
            },
        ),
    ]