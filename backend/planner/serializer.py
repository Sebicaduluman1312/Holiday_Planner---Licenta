from rest_framework import serializers
from .models import Plan, Itinerary, ItineraryItem, LikePlan

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = '__all__'

class ItinerarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Itinerary
        fields = '__all__'

class ItineraryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItineraryItem
        fields = '__all__'

class LikePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikePlan
        fields = '__all__'
