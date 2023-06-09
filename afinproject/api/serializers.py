from rest_framework import serializers
from .models import User, Event,Skill, AttendEvent, CreatedEvent
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id_user','name','surname','email','username', 'password', 'skills']
        #extra_kwargs = {'password' : {'write_only':True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id_event','event_name', 'date', 'time','address','photo','location_lat','location_lon', 'creators', 'subscribers', 'required_skill']
        #extra_kwargs = {'password' : {'write_only':True, 'required': True}}

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id_skill','skill_name']

class AttendEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttendEvent
        fields = ['event','user']
        
class CreatedEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreatedEvent
        fields = ['event','user']

    