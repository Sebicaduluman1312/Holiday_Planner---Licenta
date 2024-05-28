from rest_framework import serializers
from .models import LikedLocations, UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'
        extra_kwargs = {
            'user': {'write_only': True}
        }

class LikedLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikedLocations
        fields = '__all__'


