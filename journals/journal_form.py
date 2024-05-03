from django import forms
from django.forms import ModelForm
from .models import Journal     #calls models.py and gets Journal table


#create a journal form
class JournalForm(ModelForm):
    #Django-specific class for defining actions
    class Meta:
        model = Journal
        # fields = "__all__" #calls all fields in Journal
        fields = ('journal_id', 'user_id', 'tag_id', 'title', 'content')
        labels = {
            'journal_id': '',
            'user_id': '',
            'tag_id': '',
            'title': 'Title',
            'content': 'Fishy',
        }
        #attaches bootstrap onto form fields for styling
        widgets = {
            'journal_id': forms.NumberInput(attrs={'class':'form-control', 'placeholder':'Journal ID'}),
            'user_id': forms.NumberInput(attrs={'class':'form-control', 'placeholder':'User ID'}),
            'tag_id': forms.TextInput(attrs={'class':'form-control', 'placeholder':'Tag ID'}),
            'title': forms.TextInput(attrs={'class':'form-control', 'placeholder':'Enter title here'}),
            'content': forms.Textarea(attrs={'class':'form-control', 'placeholder':'Write your journal entry here, you can even add an image'}),
        }