from django.urls import path
from . import views

app_name = 'signup_login'
urlpatterns = [
    path('', views.LoginIndexView.as_view(), name='index'),
    path('<int:pk>/', views.LoginDetailView.as_view(), name='detail'),
]