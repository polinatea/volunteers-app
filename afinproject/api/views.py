from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
import json
from .models import User, Event, CreatedEvent, AttendEvent, Skill
from rest_framework import viewsets
from .serializers import UserSerializer, EventSerializer, SkillSerializer, AttendEventSerializer, CreatedEventSerializer
from rest_framework.renderers import JSONRenderer
from django.db.models import Count

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]


from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def suggest_event(request):
    user = request.user
    relative_news = Event.objects.filter(required_skill__in=user.skills.all()).distinct()
    serializer = EventSerializer(relative_news, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_event(request):
    user = request.user
    event_name = request.data["title"]
    date = request.data["date"]
    time = request.data["time"]
    address = request.data["address"]
    skills = request.data["skills"]
    photo = request.data["photo"]
    event = Event(event_name=event_name, date=date, time=time, address=address, photo=photo)
    event.save()
    create_event = CreatedEvent(event=event, user = user)
    create_event.save()

    return Response({'message': 'Event created successfully'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def attend_event(request):
    user = request.user
    eventId = request.data["eventId"]
    event = Event.objects.get(id_event=eventId)  
    attend_event = AttendEvent(event=event, user = user)
    attend_event.save()

    return Response({'message': 'Event attended successfully'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
    user = request.user
    user1 = UserSerializer(user)
    print()
    for i in range(len(user1.data["skills"])):
        skillName = Skill.objects.get(id_skill=user1.data["skills"][i])
        user1.data["skills"][i] =skillName.skill_name
    return Response(user1.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_all_skills(request):
    skills = Skill.objects.all()
    skills1 = SkillSerializer(skills, many=True)
    # print(skills1.data)
    return Response(skills1.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_attendees(request):
    grouped_data = AttendEvent.objects.values('event').annotate(count=Count('event'))
    attendeesList = {}
    for item in grouped_data:
        field_value = item['event']
        count = item['count']
        attendeesList[field_value] = count
    return Response(attendeesList, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_responses(request):
    userEvents = CreatedEvent.objects.filter(user = request.user)

    event_ids = userEvents.values_list('event', flat=True)  # Get event IDs from user_events

    attending_users = AttendEvent.objects.filter(event__in=event_ids).values('user','event').distinct()
    
    user_data = []
    for user_event in attending_users:
        user_id = user_event['user']
        event_id = user_event['event']

        user = User.objects.get(id_user=user_id)
        event = Event.objects.get(id_event=event_id)

        user_data.append({
            'user': {
                'id': user.id_user,
                'name': user.name,
                'surname': user.surname,
                'email': user.email,
                # Add other user fields as needed
            },
            'event': {
                'id': event.id_event,
                'name': event.event_name,
                'date': event.date,
                'time': event.time,
                # Add other event fields as needed
            }
        })

    print(user_data)

    return Response(user_data)

