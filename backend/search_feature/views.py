from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Hotel, Restaurant
from .serializers import HotelSerializer, RestaurantSerializer


class SearchHotelView(APIView):
    def get(self, request):
        if 'city' in request.query_params:
            city = request.query_params['city']
            hotels = Hotel.objects.filter(addr_city=city)
            hotel_serializer = HotelSerializer(hotels, many=True)

            return Response({
                'hotels': hotel_serializer.data
            })
        else:
            return Response({'message': 'Introdu un oras pentru cautare'}, status=400)


class SearchRestaurantView(APIView):
    def get(self, request):
        if 'city' in request.query_params:
            city = request.query_params['city']
            restaurant = Restaurant.objects.filter(addr_city=city)
            restaurant_serializer = RestaurantSerializer(restaurant, many=True)

            return Response({
                'restaurants': restaurant_serializer.data
            })
        else:
            return Response({'message':'Introdu un oras pentru cautare'}, status=400)