import jwt

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_409_CONFLICT, HTTP_401_UNAUTHORIZED, HTTP_201_CREATED, HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_204_NO_CONTENT

from .utils.formata_data import get_user_id
from .utils.autocomplete import get_autocomplete_destination
from .serializer import PlanSerializer, ItinerarySerializer, ItineraryItemSerializer
from .models import Plan, Itinerary, ItineraryItem

from concurrent.futures import ThreadPoolExecutor, as_completed
from .utils.getlocations import get_polygon_locations, format_locations_reponse
from functools import reduce

from search_feature.utils.photos_service import add_photo_to_location

class PlanView(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)
        try:
            data_planner = request.data
            data_planner['author'] = get_user_id(token)

            data_planner_serializer = PlanSerializer(data=data_planner)

            if data_planner_serializer.is_valid():
                data_planner_serializer.save()
                return Response(data_planner_serializer.data, HTTP_200_OK)

        except Exception as e:
            return Response({'message': f'Internal error in creating plan! Error: {e}'},
                            HTTP_409_CONFLICT)

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)
        try:
            if 'visit' in request.query_params:
                id_user = request.query_params['visit']
            else:
                id_user = get_user_id(token)

            user_plans = Plan.objects.filter(author=id_user).all()
            user_plans_serializer = PlanSerializer(user_plans, many=True)

            return Response(user_plans_serializer.data, HTTP_200_OK)

        except Exception as e:
            return Response({'message': f'Internal error in getting plans! Error: {e}'}, HTTP_409_CONFLICT)

    def delete(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)
        try:
            user_id = get_user_id(token)
            plan_id = request.data['plan_id']
            plan_to_delete = Plan.objects.filter(id=plan_id, author=user_id).first()
            plan_to_delete.delete()

            return Response({'message': 'Deleted plan!'}, HTTP_200_OK)

        except Exception as e:
            return Response({'message': f'Internal error in deleting plan! Error: {e}'}, HTTP_409_CONFLICT)


class AutocompletePlanner(APIView):
    def get(self, request):
        string = request.query_params['string']
        destinations = get_autocomplete_destination(string)

        if destinations:
            return Response({'destinations': destinations}, HTTP_200_OK)
        else:
            return Response(status=HTTP_204_NO_CONTENT)

class MapLocationView(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)
        try:
            polygon = request.data['polygon']

            api_response = get_polygon_locations(polygon)
            api_locations = add_photo_to_location(format_locations_reponse(api_response))

            return Response(api_locations, HTTP_200_OK)

        except Exception as e:
            return Response({'message': f'Internal error in getting map locations! Error: {e}'}, HTTP_409_CONFLICT)

class ItineraryView(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)
        try:
            user_id = get_user_id(token)
            data_itinerary = {}

            data_itinerary['author'] = user_id
            data_itinerary['plan'] = request.data['plan']
            data_itinerary['title'] = request.data['title']
            data_itinerary['summary'] = request.data['summary']
            data_itinerary['day'] = request.data['day']

            serializer_itinerary = ItinerarySerializer(data=data_itinerary)

            if serializer_itinerary.is_valid():
                serializer_itinerary.save()
                return Response(serializer_itinerary.data, HTTP_200_OK)

        except Exception as e:
            return Response({'message': f'Internal error in creating itinerary! Error: {e}'}, HTTP_409_CONFLICT)


def get(self, request):
    token = request.COOKIES.get('jwt')

    if token is None:
        return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)
    try:
        user_id = get_user_id(token)
        plan_id = request.query_params['plan']

        itineraries = Itinerary.objects.filter(author=user_id, plan=plan_id).order_by('day')

        serialized_itineraries = []
        for itinerary in itineraries:
            serialized_itineraries.append({
                'id': itinerary.id,
                'author': itinerary.author,
                'plan': itinerary.plan,
                'title': itinerary.title,
                'summary': itinerary.summary,
                'day': itinerary.day,
            })

        return Response(serialized_itineraries, HTTP_200_OK)

    except Exception as e:
        return Response({'message': f'Internal error in getting itineraries! Error: {e}'}, HTTP_409_CONFLICT)

class ItineraryItemView(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)
        try:
            data_item = request.data

            serializer_item = ItineraryItemSerializer(data=data_item)

            if serializer_item.is_valid():
                serializer_item.save()
                return Response(serializer_item.data, HTTP_200_OK)

        except Exception as e:
            return Response({'message': f'Internal error in creating item! Error: {e}'}, HTTP_409_CONFLICT)

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)
        try:
            itinerary_id = request.query_params['itinerary']

            items = ItineraryItem.objects.filter(itinerary=itinerary_id)
            serializer = ItineraryItemSerializer(items, many=True)

            return Response(serializer.data, HTTP_200_OK)
        except Exception as e:
            return Response({'message': f'Internal error in creating item! Error: {e}'}, HTTP_409_CONFLICT)

