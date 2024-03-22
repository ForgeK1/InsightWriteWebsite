from django.shortcuts import render, redirect
from django.db import models


class Meditation(models.Model):
    pub_date = models.DateTimeField('date published')

