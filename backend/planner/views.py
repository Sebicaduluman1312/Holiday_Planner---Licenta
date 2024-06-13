import jwt

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_409_CONFLICT, HTTP_401_UNAUTHORIZED, HTTP_201_CREATED, HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_204_NO_CONTENT

from .utils.formata_data import get_user_id
from .utils.autocomplete import get_autocomplete_destination
from .serializer import PlanSerializer
from .models import Plan

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
