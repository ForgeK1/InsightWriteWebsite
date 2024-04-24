from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from django.utils import timezone
from .models import Journal

from django.shortcuts import render

from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin

# Journal views
class IndexView(generic.ListView):
    template_name = 'journals/index.html'
    model = Journal
    context_object_name = 'journals' 

class DetailView(generic.DetailView):
    template_name = 'journals/detail.html'

#define custom view for the journal page
class JournalEntriesView(TemplateView):
    template_name = 'journals/Journal Entries.html'


#define custom view for the login page when log out
class CustomLoginRedirectView(LoginRequiredMixin, TemplateView):
    template_name = 'your_custom_login_redirect_template.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Add any additional context data you need here
        return context



# Class-based view for the weather page
class WeatherView(TemplateView):
    template_name = 'journals/weather.html'

