from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.UserProfileView.as_view(), name='user_profile'),
    path('like/', views.LikeLocationView.as_view(), name='like_attraction'),
    path('is_liked/', views.CheckLikedLocation.as_view(), name='like_checker'),
    path('follow/', views.FollowView.as_view(), name='follow'),
]