# Generated by Django 5.0.3 on 2024-04-26 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='background_image',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='complete_profile',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='phone_number',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='profile_image',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='role',
            field=models.CharField(choices=[('user', 'User'), ('guide', 'Guide'), ('admin', 'Admin')], max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='short_status',
            field=models.CharField(max_length=50, null=True),
        ),
    ]