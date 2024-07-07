from django.urls import path
from . import views

app_name = "planner"
urlpatterns = [
    path('create_plan/', views.PlanView.as_view(), name='create_plan'),
    path('autocomplete/', views.AutocompletePlanner.as_view(), name='autocomplete_planner'),
    path('map_location/', views.MapLocationView.as_view(), name='map_location'),
    path('itinerary/', views.ItineraryView.as_view(), name='itinerary'),
    path('itinerary_item/', views.ItineraryItemView.as_view(), name='itinerary_item'),
    path('get_days/', views.DayPlansView.as_view(), name='days'),
    path('like_plan/', views.LikePlanView.as_view(), name='like_plan'),
    path('check_like_plan/', views.CheckLikedPlanView.as_view(), name='check_like_plan'),
]
