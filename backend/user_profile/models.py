from django.db import models
from search_feature.models import Hotel, Restaurant
from django.contrib.auth import get_user_model

User = get_user_model()

ROLE_CHOICES = (
    ('user', 'User'),
    ('guide', 'Guide'),
    ('admin', 'Admin'),
)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    background_image = models.CharField(max_length=255, null=True)
    profile_image = models.CharField(max_length=255, null=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, null=True)
    phone_number = models.CharField(max_length=50, null=True)
    short_status = models.CharField(max_length=50, null=True)
    complete_profile = models.BooleanField(default=False, null=True)
    city = models.CharField(max_length=50, null=True)
    country = models.CharField(max_length=50, null=True)
    email = models.CharField(max_length=255, null=True)


class LikedLocations(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    fsq_id = models.CharField(max_length=255, null=True)

    name = models.CharField(max_length=255, null=True)
    country = models.CharField(max_length=255, null=True)
    locality = models.CharField(max_length=255, null=True)
    lat = models.FloatField(null=True)
    lon = models.FloatField(null=True)
    destination_category = models.CharField(max_length=255, null=True)
    category_icon = models.CharField(max_length=255, null=True)
    photo_url = models.CharField(max_length=255, null=True)

class Follow(models.Model):
    followed_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followed_by_set')
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following_set')
    class Meta:
        unique_together = [['followed_user', 'follower']]