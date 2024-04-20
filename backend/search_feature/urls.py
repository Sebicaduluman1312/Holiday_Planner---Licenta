from django.urls import path
from . import views

app_name = "search_feature"
urlpatterns = [
    path('hotel/', views.SearchHotelView.as_view(), name='search_hotel'),
    path('restaurant/', views.SearchRestaurantView.as_view(), name='search_restaurant'),
    path('popular/', views.PopularDestinationsView.as_view(), name='search_popular'),
    path('autocomplete/', views.AutocompleteDestinationView.as_view(), name='autocomplete'),
]

