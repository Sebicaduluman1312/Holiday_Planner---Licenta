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
    path('description/', views.DescriptionAttraction.as_view(), name='description_attraction'),
    path('related/', views.RelatedLocations.as_view(), name='related_location'),
    path('like_review/', views.LikeReviewView.as_view(), name='like_review'),
    path('dislike_review/', views.DislikeReviewView.as_view(), name='dislike_review'),
]

