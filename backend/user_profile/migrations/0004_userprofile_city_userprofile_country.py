# Generated by Django 5.0.3 on 2024-05-13 16:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0003_remove_likedlocations_hotel_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='city',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='country',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
