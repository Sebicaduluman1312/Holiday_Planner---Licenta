# Generated by Django 5.0.3 on 2024-03-24 22:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('search_feature', '0004_alter_hotel_addr_country_alter_hotel_brand_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='hotel',
            name='brand',
        ),
    ]
