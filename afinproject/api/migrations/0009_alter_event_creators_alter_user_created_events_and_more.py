# Generated by Django 4.1.6 on 2023-03-18 16:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_createdevent_event_creators_user_created_events'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='creators',
            field=models.ManyToManyField(related_name='event_creators', through='api.CreatedEvent', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='user',
            name='created_events',
            field=models.ManyToManyField(related_name='created_events', through='api.CreatedEvent', to='api.event'),
        ),
        migrations.CreateModel(
            name='AttendEvent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.event')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='event',
            name='subscribers',
            field=models.ManyToManyField(related_name='event_subscribers', through='api.AttendEvent', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='user',
            name='attend_events',
            field=models.ManyToManyField(related_name='will_attend_events', through='api.AttendEvent', to='api.event'),
        ),
    ]
