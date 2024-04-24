from django.urls import path
from . import views

from .views import CustomLoginRedirectView

from .views import WeatherView

app_name = 'journals'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('<int:pk>/', views.DetailView.as_view(), name='detail'),

    #configure the URL pattern for the /journal entries page
    path('journal-entries/', views.JournalEntriesView.as_view(), name='journal_entries'),

    #configure the URL pattern for the /custom_logout_page
    path('custom_login_redirect/', CustomLoginRedirectView.as_view(), name='custom_login_redirect'),


    #configure the URL pattern for the weather page
    # In journals/urls.py
    path('weather/', WeatherView.as_view(), name='weather'),


]