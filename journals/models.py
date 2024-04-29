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

class Tag(models.Model):
    tag_id = models.IntegerField(primary_key=True, serialize=False, verbose_name='Tag ID')
    journal_id = models.IntegerField()
    tag_name = models.CharField(max_length = 200)
    tag_color = models.CharField(max_length = 10)