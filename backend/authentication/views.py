from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_409_CONFLICT, HTTP_401_UNAUTHORIZED
from .serializers import UserSerializer
from .models import User

from user_profile.serializers import UserProfileSerializer
import jwt, datetime


class RegisterView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if User.objects.filter(email=email).exists():
            return Response({'message': 'Email already exists'}, status=HTTP_409_CONFLICT)
        else:
            user_serializer = UserSerializer(data=request.data)
            user_serializer.is_valid(raise_exception=True)  # aceasta functie valideaza datele din serializer, si le va stoca in validated_data
            user = user_serializer.save()

            profile_data = {
                'user': user.id
            }
            profile_serializer = UserProfileSerializer(data=profile_data)
            profile_serializer.is_valid(raise_exception=True)
            profile_serializer.save()

            return Response({'message': 'Account successfully created'}, status=201)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            return Response({'message': 'Incorrect email!'}, HTTP_401_UNAUTHORIZED)

        if not user.check_password(password):
            return Response({'message': 'Incorrect password!'}, HTTP_401_UNAUTHORIZED)

        exp_time = datetime.datetime.utcnow() + datetime.timedelta(minutes=60)
        created_at = datetime.datetime.utcnow()

        exp_time_formated = int(exp_time.timestamp())
        created_at_formated = int(created_at.timestamp())

        data = {
            'id': user.id,
            'email': user.email,
            'exp': exp_time_formated,
            'lat': created_at_formated,
        }

        token = jwt.encode(data, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }

        return response


class GetUserIdView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        print(token)
        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)

        try:
            data = jwt.decode(token, 'secret', algorithms=['HS256'])
        except:
            return Response({'message': 'Invalid token!'}, HTTP_401_UNAUTHORIZED)

        user_data = User.objects.filter(id=data['id']).first()
        user_serializer = UserSerializer(user_data)

        return Response({'user': user_serializer.data})


class LogOutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'Logged out user successfully!'
        }

        return response
