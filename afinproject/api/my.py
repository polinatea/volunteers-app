# from django.test import TestCase
from django.db import models
# Create your tests here.
from .models import User, Event, CreatedEvent

user = User.objects.get(id=1)