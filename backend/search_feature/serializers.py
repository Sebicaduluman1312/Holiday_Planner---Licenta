from rest_framework import serializers
from .models import Hotel, Restaurant, PopularDestinations, Searches, Review, ReplyReview


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

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ReviewSerializerWithoutAuthor(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ReplyReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReplyReview
        fields = '__all__'



