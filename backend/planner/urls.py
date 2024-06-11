from django.urls import path
from . import views

app_name = "planner"
urlpatterns = [
    path('create_plan/', views.PlanView.as_view(), name='create_plan'),
]
