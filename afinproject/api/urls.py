from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import UserViewSet, EventViewSet, create_event, attend_event, suggest_event, get_user, get_all_skills, get_attendees, get_responses
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('events', EventViewSet)
urlpatterns = [

    path('', include(router.urls)),
    path('createEvent/', create_event, name='create_event'),
    path('attendEvent/', attend_event, name='attend_event'),
    path('suggestedEvents/', suggest_event, name='suggested_events'),
    path('getUser/', get_user, name='get_user'),
    path('getAllSkills/', get_all_skills, name='get_all_skills'),
    path('getAttendees/', get_attendees, name='get_attendees'),
    path('getResponses/', get_responses, name='get_responses'),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
