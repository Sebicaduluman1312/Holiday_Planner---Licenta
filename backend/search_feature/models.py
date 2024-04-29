from django.db import models
from django.contrib.auth import get_user_model

class Hotel(models.Model):
    id = models.BigIntegerField(primary_key=True)
    lat = models.FloatField()
    lon = models.FloatField()
    name = models.CharField(max_length=255)
    addr_city = models.CharField(max_length=255)
    addr_country = models.CharField(max_length=255, null=True, default=None)
    addr_street = models.CharField(max_length=255, null=True, default=None)
    contact_phone = models.CharField(max_length=255, null=True, default=None)
    contact_email = models.CharField(max_length=255, null=True, default=None)
    tourism = models.CharField(max_length=50, null=True, default=None)

    def __str__(self):
        return self.name


class Restaurant(models.Model):
    id = models.BigIntegerField(primary_key=True)
    lat = models.FloatField()
    lon = models.FloatField()
    name = models.CharField(max_length=255)
    amenity = models.CharField(max_length=50)
    cuisine = models.CharField(max_length=255, null=True, default=None)
    addr_city = models.CharField(max_length=255)
    addr_country = models.CharField(max_length=10, null=True, default=None)
    addr_street = models.CharField(max_length=255, null=True, default=None)
    contact_phone = models.CharField(max_length=255, null=True, default=None)
    contact_email = models.CharField(max_length=255, null=True, default=None)

    def __str__(self):
        return self.name


class PopularDestinations(models.Model):
    fsq_id = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    locality = models.CharField(max_length=255)
    destination_category = models.CharField(max_length=255)
    category_icon = models.CharField(max_length=255)
    photo_url = models.CharField(max_length=255)
    lon = models.FloatField(null=True)
    lat = models.FloatField(null=True)

    def __str__(self):
        return self.name


User = get_user_model()
class Searches(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=255)

