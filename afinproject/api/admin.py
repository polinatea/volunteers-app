from django.contrib import admin

# Register your models here.
from .models import User, Event, Skill, CreatedEvent, AttendEvent

admin.site.register(User)
admin.site.register(Event)
admin.site.register(Skill)
admin.site.register(CreatedEvent)
admin.site.register(AttendEvent)