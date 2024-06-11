from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Plan(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    destination = models.CharField(max_length=255, null=True)
    destination = models.CharField(max_length=255, null=True)
    image_url = models.CharField(max_length=255, null=True)
    start_date = models.DateField()
    end_date = models.DateField()
    