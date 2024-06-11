import jwt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_409_CONFLICT, HTTP_401_UNAUTHORIZED, HTTP_200_OK, HTTP_404_NOT_FOUND

from .models import UserProfile, LikedLocations, Follow
from .serializers import UserProfileSerializer, LikedLocationSerializer, FollowSerializer

class UserProfileView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in'}, HTTP_401_UNAUTHORIZED)

        try:
            user_data = jwt.decode(token, 'secret', algorithms=['HS256'])

            if 'visit' in request.query_params:
                id_user = request.query_params['visit']
            else:
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

            if 'visit' in request.query_params:
                id_user = request.query_params['visit']
            else:
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

class CheckLikedLocation(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)

        try:
            user_data = jwt.decode(token, 'secret', algorithms=['HS256'])
            id_user = user_data['id']

            liked_data = request.data.get('data')

            if LikedLocations.objects.filter(user=id_user, fsq_id=liked_data['fsq_id']).exists():
                return Response({'message': 'true'}, HTTP_200_OK)

            return Response({'message': 'false'}, HTTP_200_OK)

        except Exception as e:
            return Response({'message': f'Internal problem in checking liked locations: {e}'}, HTTP_409_CONFLICT)

class FollowView(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)

        try:
            user_data = jwt.decode(token, 'secret', algorithms=['HS256'])
            id_user = user_data['id']
            id_user_to_follow = request.data['id']
            data_follow = {}
            data_follow['followed_user'] = id_user_to_follow
            data_follow['follower'] = id_user

            serializer = FollowSerializer(data=data_follow)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Followed successfully'}, HTTP_200_OK)

            return Response({'message': 'Error in following user!'}, HTTP_409_CONFLICT)
        except Exception as e:
            return Response({'message': f'Internal problem in checking liked locations: {e}'}, HTTP_409_CONFLICT)

    def delete(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)

        try:
            user_data = jwt.decode(token, 'secret', algorithms=['HS256'])
            id_user = user_data['id']
            id_user_to_unfollow = request.data['id']

            try:
                follow_instance = Follow.objects.get(follower=id_user, followed_user=id_user_to_unfollow)
            except Follow.DoesNotExist:
                return Response({"message": "Follow not found"}, HTTP_404_NOT_FOUND)

            follow_instance.delete()
            return Response({'message': 'Unfollowed successfully'}, HTTP_200_OK)

        except Exception as e:
            return Response({'message': f'Internal problem in checking liked locations: {e}'}, HTTP_409_CONFLICT)

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)

        try:
            user_data = jwt.decode(token, 'secret', algorithms=['HS256'])
            if 'visit' in request.query_params:
                id_user = request.query_params['visit']
            else:
                id_user = user_data['id']

            following = Follow.objects.filter(follower=id_user).values_list('followed_user', flat=True)
            followers = Follow.objects.filter(followed_user=id_user).values_list('follower', flat=True)

            return Response({
                'following': list(following),
                'followers': list(followers),
            }, HTTP_200_OK)

        except Exception as e:
            return Response({'message': f'Internal problem in checking liked locations: {e}'}, HTTP_409_CONFLICT)
