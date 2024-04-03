from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from .models import User
import jwt, datetime


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(
            raise_exception=True)  # aceasta functie valideaza datele din serializer, si le va stoca in validated_data
        serializer.save()

        return Response({'message': 'Account successfully created'}, status=201)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password, try again!')

        exp_time = datetime.datetime.utcnow() + datetime.timedelta(days=1)
        created_at = datetime.datetime.utcnow()

        exp_time_formated = int(exp_time.timestamp())
        created_at_formated = int(created_at.timestamp())

        data = {
            'id': user.id,
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
            raise AuthenticationFailed('Need to be authenticated!')

        try:
            data = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Expired token!')


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
