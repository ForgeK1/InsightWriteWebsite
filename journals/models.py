from django.db import models

# Journal Models

class Journal(models.Model):
    journal_id = models.IntegerField(primary_key=True, serialize=False, verbose_name='Journal ID')
    user_id = models.IntegerField()
    tag_id = models.CharField()
    title = models.CharField(max_length=200)
    entry_date = models.DateField('Date published')
    last_modified_date = models.DateField('Last modified')
    content = models.TextField() 

    '''
    __Extra optional fields__ 
    self.content = c
    self.font = f
    self.color = clr
    '''