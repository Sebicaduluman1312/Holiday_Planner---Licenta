# Generated by Django 5.0.3 on 2024-04-26 14:13

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('search_feature', '0013_populardestinations_lat_populardestinations_lon'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='LikedLocations',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fsq_id', models.CharField(max_length=255, null=True)),
                ('name', models.CharField(max_length=255)),
                ('country', models.CharField(max_length=255)),
                ('locality', models.CharField(max_length=255)),
                ('lat', models.FloatField(null=True)),
                ('lon', models.FloatField(null=True)),
                ('hotel_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='search_feature.hotel')),
                ('restaurant_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='search_feature.restaurant')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('background_image', models.CharField(max_length=255)),
                ('profile_image', models.CharField(max_length=255)),
                ('role', models.CharField(choices=[('user', 'User'), ('guide', 'Guide'), ('admin', 'Admin')], max_length=20)),
                ('phone_number', models.CharField(max_length=50)),
                ('short_status', models.CharField(max_length=50)),
                ('complete_profile', models.BooleanField(default=False)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
