import jwt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_409_CONFLICT, HTTP_401_UNAUTHORIZED, HTTP_200_OK

from .models import UserProfile, LikedLocations
from .serializers import UserProfileSerializer, LikedLocationSerializer

class UserProfileView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in'}, HTTP_401_UNAUTHORIZED)

        try:
            user_data = jwt.decode(token, 'secret', algorithms=['HS256'])
            id_user = user_data['id']

            data_profile = UserProfile.objects.filter(user_id=id_user).first()
            serializer_data = UserProfileSerializer(data_profile)

            return Response({'user_profile': serializer_data.data})

        except:
            return Response({'message': 'Internal problem getting user info'}, HTTP_409_CONFLICT)

    def put(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)

        try:
            user_data = jwt.decode(token, 'secret', algorithms=['HS256'])
            id_user = user_data['id']

            update_data = request.data.get('data')
            user_profile = UserProfile.objects.get(user=id_user)

            for attribute, value in update_data.items():
                setattr(user_profile, attribute, value)

            user_profile.complete_profile = True
            user_profile.save()

            return Response({'message': 'User profile updated!'}, HTTP_200_OK)
        except:
            return Response({'message': 'Internal problem in updating data profile'}, HTTP_409_CONFLICT)


class LikeLocationView(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)

        try:
            user_data = jwt.decode(token, 'secret', algorithms=['HS256'])
            id_user = user_data['id']

            liked_data = request.data.get('data')
            liked_data['user'] = id_user

            if LikedLocations.objects.filter(user=id_user, fsq_id=liked_data['fsq_id']).exists():
                return Response({'message': 'Location already liked!'}, HTTP_409_CONFLICT)

            like_serializer = LikedLocationSerializer(data=liked_data)
            like_serializer.is_valid(raise_exception=True)
            like_serializer.save()

            return Response({'message': 'Location liked!'}, HTTP_200_OK)

        except Exception as e:
            return Response({'message': f'Internal error in like attraction: {e}!'}, HTTP_409_CONFLICT)

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)

        try:
            user_data = jwt.decode(token, 'secret', algorithms=['HS256'])
            id_user = user_data['id']

            liked_locations = LikedLocations.objects.filter(user=id_user).all()
            liked_locations_serializer = LikedLocationSerializer(liked_locations, many=True)

            return Response({'message': liked_locations_serializer.data}, HTTP_200_OK)

        except Exception as e:
            return Response({'message': f'Internal problem in getting liked locations: {e}'}, HTTP_409_CONFLICT)

    def delete(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)

        try:
            user_data = jwt.decode(token, 'secret', algorithms=['HS256'])
            id_user = user_data['id']

            data = request.data.get('data')

            liked_location = LikedLocations.objects.filter(user=id_user, fsq_id=data['fsq_id']).first()
            liked_location.delete()

            return Response({'message': 'Disliked attraction!'}, HTTP_200_OK)

        except Exception as e:
            return Response({'message': f'Internal problem in deletting liked locations: {e}'}, HTTP_409_CONFLICT)
