from django.urls import path
from . import views

app_name = "search_feature"
urlpatterns = [
    path('location/', views.SearchLocations.as_view(), name='search_location'),
    path('popular/', views.PopularDestinationsView.as_view(), name='search_popular'),
    path('autocomplete/', views.AutocompleteDestinationView.as_view(), name='autocomplete'),
    path('popular_searches/', views.SearchLocationCounter.as_view(), name='counter_searches'),
    path('details/', views.DetailedDescription.as_view(), name='detail_description'),
    path('reviews/', views.ReviewDestination.as_view(), name='reviews'),
    path('reply_review/', views.ReplyReviewView.as_view(), name='reply_reviews'),
]

