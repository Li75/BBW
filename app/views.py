import hashlib
import random
import time

from django.core.cache import cache
from django.http import JsonResponse
from django.shortcuts import render, redirect


# Create your views here.


from app.models import User, Goods, Cart


def index(request):
    token = request.session.get('token')
    userid = cache.get(token)
    goods = Goods.objects.all()
    response_data = {
        'user': None,
        'goods':goods
    }

    if userid:
        user = User.objects.get(pk=userid)
        response_data['user'] = user


    return render(request, 'index/index.html', context=response_data)


def generate_password(param):
    md5 = hashlib.md5()
    md5.update(param.encode('utf-8'))
    return md5.hexdigest()


def generate_token():
    temp = str(time.time()) + str(random.random())
    md5 = hashlib.md5()
    md5.update(temp.encode('utf-8'))
    return md5.hexdigest()


def register(request):
    if request.method == 'GET':
        return render(request, 'register/register.html')
    elif request.method == 'POST':
        # 获取数据
        phone = request.POST.get('phone')
        username = request.POST.get('username')
        password = generate_password(request.POST.get('password'))

        # 存入数据库
        user = User()
        user.phone = phone
        user.password = password
        user.username = username
        user.save()

        token = generate_token()

        cache.set(token, user.id, 60*60*24*3)

        request.session['token'] = token

        return redirect('app:index')




def login(request):
    if request.method == 'GET':
        return render(request, 'login/login.html')
    elif request.method == 'POST':
        phone = request.POST.get('phone')
        password = request.POST.get('password')

        users = User.objects.filter(phone=phone)
        if users.exists():
            user = users.first()
            if user.password == generate_password(password):

                token = generate_token()

                cache.set(token, user.id, 60*60*24*3)

                request.session['token'] = token

                return render(request,'index/index.html',context={'user':user})
            else:   # 密码错误
                return render(request, 'login/login.html', context={'pwd_err': '密码错误!'})
        else:
            return render(request, 'login/login.html', context={'user_err':'用户不存在!'})


def check(request):
    phone = request.GET.get('phone')
    users = User.objects.filter(phone=phone)
    if users.exists:
        responese_data = {
            'status':0,
            'msg':'账号被占用!'
        }
    else:
        responese_data = {
            'status':1,
            'msg':'账号可用!'
        }
    return JsonResponse(responese_data)


def logout(request):
    request.session.flush()
    return redirect('app:index')


def shopdetail(request):
    token = request.session.get('token')
    userid = cache.get(token)
    response_data = {
        'user': None
    }

    if userid:
        user = User.objects.get(pk=userid)
        response_data['user'] = user


    return render(request,'product-detailes/product-detailes.html',context=response_data)


def addcart(request):
    token = request.session.get('token')
    response_data = {}
    if token:
        userid = cache.get(token)
        if userid:  # 已经登录
            user = User.objects.get(pk=userid)
            goodsid = request.GET.get('goodsid')
            goods = Goods.objects.get(pk=goodsid)
            carts = Cart.objects.filter(user=user).filter(goods=goods)
            if carts.exists():
                cart = carts.first()
                cart.number = cart.number + 1
                cart.save()
            else:
                cart = Cart()
                cart.user = user
                cart.goods = goods
                cart.number = 1
                cart.save()

            response_data['status'] = 1
            response_data['number'] = cart.number
            response_data['msg'] = '添加 {} 成功: {}'.format(cart.goods.word, cart.number)

        return JsonResponse(response_data)

    response_data['status'] = -1
    response_data['msg'] = '请登录后操作'
    return JsonResponse(response_data)

def cart(request):
    token = request.session.get('token')
    userid = cache.get(token)

    if userid:  # 有登录才显示
        user = User.objects.get(pk=userid)
        carts = user.cart_set.filter(number__gt=0)

        isall = True
        for cart in carts:
            if not cart.isselect:
                isall = False

        return render(request, 'cart/cart.html', context={'carts': carts, 'isall': isall,'user':user})
    else:  # 未登录不显示
        return render(request, 'login/login.html',)