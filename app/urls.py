from django.conf.urls import url

from app import views

urlpatterns = [
    url(r'^$',views.index,name='index'),
    url(r'^cart/$',views.cart,name='cart'),
    url(r'^register/$',views.register,name='register'),
    url(r'^login/$',views.login,name='login'),
    url(R'^check/$',views.check,name='check'),
    url(r'^logout/$',views.logout,name='logout'),
    url(r'^shopdetail/$',views.shopdetail,name='shopdetail'),
    url(r'^addcart/$',views.addcart,name='addcart')

]