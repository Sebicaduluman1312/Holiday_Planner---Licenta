# Generated by Django 5.0.3 on 2024-03-24 22:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('search_feature', '0003_hotel_contact_email_alter_hotel_addr_country_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hotel',
            name='addr_country',
            field=models.CharField(default=None, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='hotel',
            name='brand',
            field=models.CharField(default=None, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='hotel',
            name='contact_phone',
            field=models.CharField(default=None, max_length=255, null=True),
        ),
    ]
