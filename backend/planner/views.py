import jwt

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_409_CONFLICT, HTTP_401_UNAUTHORIZED, HTTP_201_CREATED, HTTP_200_OK, HTTP_404_NOT_FOUND

from .utils.formata_data import get_user_id
from .serializer import PlanSerializer
from .models import Plan

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
