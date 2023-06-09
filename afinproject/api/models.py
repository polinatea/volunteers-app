from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    id_user = models.AutoField(primary_key=True)
    name = models.CharField(max_length=64)
    surname = models.CharField(max_length=64)
    login = models.CharField(max_length=64, blank=True)
    email = models.EmailField(max_length=255,blank=False)
    password = models.TextField(max_length=255)
    created_events = models.ManyToManyField('Event', through='CreatedEvent', related_name='created_events')
    attend_events = models.ManyToManyField('Event', through='AttendEvent', related_name='will_attend_events')
    skills = models.ManyToManyField('Skill', blank=True)
    def __str__(self):
        return self.username
    



class Event(models.Model):
    id_event = models.AutoField(primary_key=True)
    event_name = models.CharField(max_length=64)
    date = models.DateField()
    time = models.TimeField()
    address = models.CharField(max_length=128, blank=True, null=True)
    photo = models.ImageField(upload_to='images/',blank=True, null=True)
    location_lat = models.DecimalField(max_digits=17, decimal_places=14, blank=True, null=True)
    location_lon = models.DecimalField(max_digits=17, decimal_places=14, blank=True, null=True)
    creators = models.ManyToManyField('User', through='CreatedEvent', related_name='event_creators')
    subscribers = models.ManyToManyField('User', through='AttendEvent', related_name='event_subscribers')
    required_skill = models.ManyToManyField('Skill')

    def __str__(self):
        return self.event_name


class Skill(models.Model):
    id_skill = models.AutoField(primary_key=True)
    skill_name = models.CharField(max_length=255)
    
    def __str__(self):
        return self.skill_name

class CreatedEvent(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user, self.event

class AttendEvent(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)    
    def __str__(self):
        return self.user, self.event


  
