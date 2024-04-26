from django import forms
from django.forms import ModelForm
from .models import Journal     #calls models.py and gets Journal table


#create a journal form
class JournalForm(ModelForm):
    #Django-specific class for defining actions
    class Meta:
        model = Journal
        # fields = "__all__" #calls all fields in Journal
        fields = ('journal_id', 'user_id', 'tag_id', 'title', 'entry_date', 'last_modified_date', 'content')
        labels = {
            'journal_id': '',
            'user_id': '',
            'tag_id': '',
            'title': '',
            'entry_date': 'Entry Date:',
            'last_modified_date': 'Last Modified Date\n',
            'content': '',
        }
        #attaches bootstrap onto form fields for styling
        widgets = {
            'journal_id': forms.NumberInput(attrs={'class':'form-control', 'placeholder':'Journal ID'}),
            'user_id': forms.NumberInput(attrs={'class':'form-control', 'placeholder':'User ID'}),
            'tag_id': forms.TextInput(attrs={'class':'form-control', 'placeholder':'Tag ID'}),
            'title': forms.TextInput(attrs={'class':'form-control', 'placeholder':'Title'}),
            'entry_date': forms.DateInput(attrs={'class':'form-control', 'placeholder':'Entry Date', 'type':'date', 'id':'date'}),
            'last_modified_date': forms.DateInput(attrs={'class':'form-control', 'placeholder':'Last Modified Date', 'type':'date', 'id':'date'}),
            'content': forms.Textarea(attrs={'class':'form-control', 'placeholder':'Description'}),
        }