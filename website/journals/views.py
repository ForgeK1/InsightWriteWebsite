from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from django.utils import timezone
from .models import Journal

from django.views.generic import TemplateView

# Journal views
class IndexView(generic.ListView):
    template_name = 'journals/index.html'
    model = Journal
    context_object_name = 'journals' 

class DetailView(generic.DetailView):
    template_name = 'journals/detail.html'

class JournalEntriesView(TemplateView):
    template_name = 'journals/Journal Entries.html'
