from rest_framework import serializers
from .models import Hotel, Restaurant, PopularDestinations


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'

class PopularDestiatiosSerializer(serializers.ModelSerializer):
    class Meta:
        model = PopularDestinations
        fields = '__all__'
