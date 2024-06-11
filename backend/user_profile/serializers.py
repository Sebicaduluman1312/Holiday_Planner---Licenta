from rest_framework import serializers
from .models import LikedLocations, UserProfile, Follow


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


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = '__all__'
