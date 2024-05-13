from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.UserProfileView.as_view(), name='user_profile'),
    path('like/', views.LikeLocationView.as_view(), name='like_attraction'),
]