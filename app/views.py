import hashlib
import random
import time

from django.core.cache import cache
from django.shortcuts import render, redirect


# Create your views here.


from app.models import User


def index(request):
    token = request.session.get('token')
    userid = cache.get(token)
    response_data = {
        'user': None
    }

    if userid:
        user = User.objects.get(pk=userid)
        response_data['user'] = user

    return render(request, 'index/index.html', context=response_data)


def cart(request):
    return render(request,'cart/cart.html')


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

        back = request.COOKIES.get('back')

        users = User.objects.filter(phone=phone)
        if users.exists():
            user = users.first()
            if user.password == generate_password(password):

                token = generate_token()

                cache.set(token, user.id, 60*60*24*3)

                request.session['token'] = token

                if back == 'mine':
                    return redirect('app:index')
                else:
                    return redirect('app:index')
            else:   # 密码错误
                return render(request, 'login/login.html', context={'ps_err': '密码错误'})
        else:
            return render(request, 'login/login.html', context={'user_err':'用户不存在'})


def logout(request):
    request.session.flush()
    return redirect('app:index')