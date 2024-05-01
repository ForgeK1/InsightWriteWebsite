from django.db import models

class Analytics(models.Model):
    analytics_id = models.IntegerField(primary_key=True, serialize=False, verbose_name='Analytics ID')
    user_id = models.IntegerField()
    days_of_journaling = models.IntegerField()
    positive_keywords = models.IntegerField()
    negative_keywords = models.IntegerField()
    date_window_weekly = models.DateField('Weekly Analytics')
    mood = models.IntegerField()