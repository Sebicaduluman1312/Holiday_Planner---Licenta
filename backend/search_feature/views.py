import jwt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_409_CONFLICT, HTTP_401_UNAUTHORIZED, HTTP_201_CREATED, HTTP_200_OK

from .models import Hotel, PopularDestinations, Searches
from .serializers import HotelSerializer, PopularDestinationsSerializer, SearchesSerializer
from django.db.models import Count

from .utils.autocomplete_service import get_autocomplete_destination
from .utils.locations_service import get_locations_from_API, format_locations_reponse, get_locations_from_database, get_api_details_for_database_location
from .utils.popular_destination_service import request_popular_destination, get_custom_destination_array, \
    save_final_destination
from .utils.photos_service import add_photo_to_location


class PopularDestinationsView(APIView):
    def get(self, request):

        destinations = PopularDestinations.objects.all()
        destinations_serializer = PopularDestinationsSerializer(destinations, many=True)

        return Response({
            'message': 'Din baza de date!',
            'content': destinations_serializer.data
        }, HTTP_200_OK)

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

class AutocompleteDestinationView(APIView):
    def get(self, request):
        string = request.query_params['string']
        destinations = get_autocomplete_destination(string)

        return Response({'destinations': destinations}, HTTP_200_OK)

class SearchLocations(APIView):
    def get(self, request):
        try:
            query_params = request.query_params

            # From API
            api_locations = get_locations_from_API(query_params['category'], query_params['location'], query_params['sort'])
            formated_api_locations = add_photo_to_location(format_locations_reponse(api_locations))

            # From Database
            database_locations = get_locations_from_database(query_params['category'], query_params['location'])
            if len(database_locations):
                formated_database_locations = add_photo_to_location(
                    get_api_details_for_database_location(database_locations))

            return Response({'database_locations': formated_database_locations, 'api_locations': formated_api_locations}, HTTP_200_OK)
        except:
            return Response({'message': 'Internal problem searching locations'}, HTTP_409_CONFLICT)

class SearchLocationCounter(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)

        try:
            data = jwt.decode(token, 'secret', algorithms=['HS256'])
            id_user = data['id']
            location = request.query_params['location'].strip()

            serializer = SearchesSerializer(data={'user': id_user, 'location': location})
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Location registered'}, HTTP_201_CREATED)
            else:
                return Response({'message': 'Location not registered'}, HTTP_409_CONFLICT)
        except:
            return Response({'message': 'Internal error posting locations!'}, HTTP_409_CONFLICT)

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)

        try:
            top_10_destinations = Searches.objects.values('location').annotate(search_count=Count('location')).order_by('-search_count')[:10]

            return Response({'top_10_locations':top_10_destinations}, HTTP_201_CREATED)

        except:
            return Response({'message': 'Internal error getting popular locations!'}, HTTP_409_CONFLICT)