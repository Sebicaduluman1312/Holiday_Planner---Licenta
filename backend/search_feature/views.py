from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Hotel, Restaurant, PopularDestinations
from .serializers import HotelSerializer, RestaurantSerializer, PopularDestiatiosSerializer
from .utils.popular_destination_manager import request_popular_destination, get_custom_destination_array, \
    save_final_destination
from .utils.photos_manager import add_photo_to_location


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
            return Response({'message': 'Introdu un oras pentru cautare'}, status=400)


class PopularDestinationsView(APIView):
    def get(self, request):

        destinations = PopularDestinations.objects.all()
        destinations_serializer = PopularDestiatiosSerializer(destinations, many=True)

        return Response({
            'message': 'Din baza de date!',
            'cotent': destinations_serializer.data
        })

        # response = request_popular_destination()
        #
        # if response.ok:
        #     custom_destinations = get_custom_destination_array(response)
        #     updated_destinations = add_photo_to_location(custom_destinations)
        #     save_final_destination(updated_destinations)
        #
        #     return Response({'message': 'Datele au fost salvate in baza de date', 'content': updated_destinations})
        # else:
        #     return Response({'message': 'Failed to fetch popular destinations'})
