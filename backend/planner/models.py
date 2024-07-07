from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Plan(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    destination = models.CharField(max_length=255, null=True)
    description = models.CharField(max_length=255, null=True)
    image_url = models.CharField(max_length=255, null=True)
    start_date = models.DateField()
    end_date = models.DateField()

class Itinerary(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, null=True)
    summary = models.CharField(max_length=512, null=True)
    day = models.IntegerField(null=True)

class ItineraryItem(models.Model):
    itinerary = models.ForeignKey(Itinerary, on_delete=models.CASCADE)
    photo = models.CharField(max_length=512, null=True)
    location = models.CharField(max_length=255, null=True)
    description = models.CharField(max_length=512, null=True)
    start_hour = models.CharField(max_length=50, null=True)
    end_hour = models.CharField(max_length=50, null=True)
    day = models.IntegerField(null=True)

class LikePlan(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    id_plan = models.ForeignKey(Plan, on_delete=models.CASCADE)


