import jwt

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_409_CONFLICT, HTTP_401_UNAUTHORIZED, HTTP_201_CREATED, HTTP_200_OK, HTTP_404_NOT_FOUND

from .utils.formata_data import get_user_id

class PlanView(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)
        try:
            data_planner = request.data['data']
            data_planner['author'] = get_user_id(token)


            return Response({'message': 'Plan created successfully'}, HTTP_200_OK)
        except Exception as e:
            return Response({'message': f'Internal error in creating plan! Error: {e}'},
                            HTTP_409_CONFLICT)

