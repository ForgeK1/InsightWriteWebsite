"""
URL configuration for project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static
from django.conf import settings
from login_signup import views

# All webpage paths for Insight Write
urlpatterns = [
    path('admin/', admin.site.urls),
    path('polls/', include('polls.urls')),
    path('journals/', include('journals.urls')),
    path('login_signup/', include('login_signup.urls')),
    path('meditations/', include('meditations.urls')),
    path('accounts/', include('allauth.urls')),
    path('calendar/', include('calendar.urls')),
    
    
]

# Serve media files from MEDIA_ROOT. It will only work when DEBUG=True is set.
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
