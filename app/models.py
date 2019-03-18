from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    password = models.CharField(max_length=256)

    class Meta:
        db_table = 'bbw_user'



'''
"img": "../img/goods%20detail/big1-1.jpg",
"num": "限件999件",
"price":"39",
  "del":"200",
"today":"今日特卖",
  "word":"南极人加绒加厚女童七彩棉",
  "a":"删除",
"image":[
  {"img":"../img/goods%20detail/big1-1.jpg"},
  {"img":"../img/goods%20detail/big1-2.jpg"},
  {"img":"../img/goods%20detail/big1-3.jpg"},
  {"img":"../img/goods%20detail/big1-4.jpg"},
  {"img":"../img/goods%20detail/big1-5.jpg"},
  {"img":"../img/goods%20detail/big1-6.jpg"},
  {"img":"../img/goods%20detail/big1-7.jpg"},
  {"img":"../img/goods%20detail/big1-8.jpg"}
'''
class Goods(models.Model):
    img = models.CharField(max_length=100)
    num = models.CharField(max_length=40)
    price = models.IntegerField()
    dels = models.IntegerField()
    today = models.CharField(max_length=40)
    word = models.CharField(max_length=40)
    delete = models.IntegerField(default=0)


    class Meta:
        db_table = 'bbw_goods'



class Cart(models.Model):
    user = models.ForeignKey(User)
    goods = models.ForeignKey(Goods)
    number = models.IntegerField()
    # 是否选中
    isselect = models.BooleanField(default=True)
    # 是否删除
    isdelete = models.BooleanField(default=False)

    class Meta:
        db_table = 'bbw_cart'


