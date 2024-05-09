from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from django.utils import timezone
from .models import Calendar

from django.shortcuts import render

from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin

# Calendar views
class IndexView(generic.ListView):
    template_name = 'calendar/index.html'
    model = Calendar
    context_object_name = 'calendar' 

class DetailView(generic.DetailView):
    template_name = 'calendar/detail.html'

