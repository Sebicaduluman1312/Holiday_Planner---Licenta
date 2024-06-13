from django.urls import path
from . import views

app_name = "planner"
urlpatterns = [
    path('create_plan/', views.PlanView.as_view(), name='create_plan'),
    path('autocomplete/', views.AutocompletePlanner.as_view(), name='autocomplete_planner'),
    path('map_location/', views.MapLocationView.as_view(), name='map_location'),
]
