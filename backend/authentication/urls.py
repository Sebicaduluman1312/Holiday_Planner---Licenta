from django.urls import path
from .views import RegisterView, LoginView, GetUserIdView, LogOutView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/', GetUserIdView.as_view(), name='get-user-id'),
    path('logout/', LogOutView.as_view(), name='logout')
]
