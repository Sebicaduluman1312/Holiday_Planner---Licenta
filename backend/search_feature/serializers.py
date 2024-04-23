from rest_framework import serializers
from .models import Hotel, Restaurant, PopularDestinations, Searches


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'

class PopularDestinationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PopularDestinations
        fields = '__all__'

class SearchesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Searches
        fields = '__all__'