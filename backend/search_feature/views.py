import jwt, copy
from functools import reduce

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_409_CONFLICT, HTTP_401_UNAUTHORIZED, HTTP_201_CREATED, HTTP_200_OK, HTTP_404_NOT_FOUND

from .models import Hotel, PopularDestinations, Searches, Review, ReplyReview, LikeReview, DislikeReview
from .serializers import HotelSerializer, PopularDestinationsSerializer, SearchesSerializer, ReviewSerializer, ReplyReviewSerializer, ReviewSerializerWithoutAuthor, LikeReviewSerializer, DislikeReviewSerializer
from django.db.models import Count

from .utils.autocomplete_service import get_autocomplete_destination
from .utils.locations_service import get_locations_from_API, format_locations_reponse, get_locations_from_database, get_api_details_for_database_location
from .utils.popular_destination_service import request_popular_destination, get_custom_destination_array, \
    save_final_destination
from .utils.photos_service import add_photo_to_location
from .utils.details_services import get_destination_details, get_destination_photos, get_destination_rating, get_description, get_related_attractions
from .utils.reviews_service import get_api_reviews, make_review_object, get_id_user


class PopularDestinationsView(APIView):
    def get(self, request):

        destinations = PopularDestinations.objects.all()
        destinations_serializer = PopularDestinationsSerializer(destinations, many=True)

        return Response({
            'message': 'Din baza de date!',
            'content': destinations_serializer.data
        }, HTTP_200_OK)

        # response = request_popular_destination()
        #
        # if response.ok:
        #     custom_destinations = get_custom_destination_array(response)
        #     updated_destinations = add_photo_to_location(custom_destinations)
        #     save_final_destination(updated_destinations)
        #
        #     return Response({'message': 'Datele au fost salvate in baza de date', 'content': updated_destinations})
        # else:
        #     return Response({'message': 'Failed to fetch popular destinations'})

class AutocompleteDestinationView(APIView):
    def get(self, request):
        string = request.query_params['string']
        destinations = get_autocomplete_destination(string)

        return Response({'destinations': destinations}, HTTP_200_OK)

class SearchLocations(APIView):
    def get(self, request):
        try:
            query_params = request.query_params

            categories = query_params['category'].split(',')
            print(categories)
            # From API
            api_response = []
            for category in categories:
                api_locations = get_locations_from_API(category, query_params['location'], query_params['sort'])
                formated_api_locations = add_photo_to_location(format_locations_reponse(api_locations))
                api_response.append(formated_api_locations)

            api_response = reduce(lambda x, y: x + y, api_response)

            # From Database
            database_locations = get_locations_from_database(query_params['category'], query_params['location'])
            if len(database_locations):
                formated_database_locations = add_photo_to_location(
                    get_api_details_for_database_location(database_locations))
            else:
                formated_database_locations = []

            return Response({'database_locations': formated_database_locations, 'api_locations': api_response}, HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'message': f'Internal problem searching locations: {e}'}, HTTP_409_CONFLICT)

class SearchLocationCounter(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)

        try:
            data = jwt.decode(token, 'secret', algorithms=['HS256'])
            id_user = data['id']
            location = request.query_params['location'].strip()

            serializer = SearchesSerializer(data={'user': id_user, 'location': location})
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Location registered'}, HTTP_201_CREATED)
            else:
                return Response({'message': 'Location not registered'}, HTTP_409_CONFLICT)
        except:
            return Response({'message': 'Internal error posting locations counter!'}, HTTP_409_CONFLICT)

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)

        try:
            top_10_destinations = Searches.objects.values('location').annotate(search_count=Count('location')).order_by('-search_count')[:10]

            return Response({'top_10_locations': top_10_destinations}, HTTP_201_CREATED)

        except:
            return Response({'message': 'Internal error getting popular locations!'}, HTTP_409_CONFLICT)

class DetailedDescription(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)

        try:
            id_location = request.query_params['fsq_id']
            details = {}

            get_destination_details(id_location, details)
            get_destination_photos(id_location, details)
            get_destination_rating(id_location, details)

            return Response({'data': details}, HTTP_200_OK)

        except:
            return Response({'message': 'Internal error getting details for location!'}, HTTP_409_CONFLICT)

class ReviewDestination(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)
        try:
            id_location = request.query_params['fsq_id']
            reviews_api = {}
            get_api_reviews(id_location, reviews_api)

            reviews_comunity = Review.objects.filter(destination_id=id_location)
            serializer = ReviewSerializerWithoutAuthor(reviews_comunity, many=True)

            return Response({'comunity_reviews': serializer.data, 'api_reviews': reviews_api}, HTTP_200_OK)

        except:
            return Response({'message': 'Internal error getting details for location!'}, HTTP_409_CONFLICT)

    def post(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)
        try:
            review_object = request.data
            make_review_object(token, review_object)

            serializer = ReviewSerializer(data=review_object)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=HTTP_404_NOT_FOUND)
        except:
            return Response({'message': 'Internal error in posting review'}, HTTP_409_CONFLICT)

    def put(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)
        try:

            id_user = get_id_user(token)
            id_review = request.data['id']

            review = Review.objects.get(id=id_review, author=id_user)
            review.comment = request.data['new_comment']
            review.rating = request.data['rating']
            review.save()

            return Response({'message': 'Updated review'})

        except Exception as e:
            return Response({'message': f'Internal error in update review! Error: {e}'}, HTTP_409_CONFLICT)

    def delete(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)
        try:

            id_user = get_id_user(token)
            id_review = request.data['id']

            review = Review.objects.get(id=id_review, author=id_user)
            review.delete()

            return Response({'message': 'Deleted review'}, HTTP_200_OK)

        except Review.DoesNotExist:
            return Response({'message': 'Review not found'}, HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'message': f'Internal error in deleting review! Error: {e}'}, HTTP_409_CONFLICT)

class ReplyReviewView(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)
        try:
            reply_data = request.data
            reply_data['review'] = request.data['id']
            reply_data['author'] = get_id_user(token)

            serializer = ReplyReviewSerializer(data=reply_data)

            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Reply sent'}, HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=HTTP_409_CONFLICT)

        except Exception as e:
            return Response({'message': f'Internal error in replying review! Error: {e}'}, HTTP_409_CONFLICT)

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)
        try:
            id_review = request.query_params['id']
            replies = ReplyReview.objects.filter(review=id_review)
            serializer = ReplyReviewSerializer(replies, many=True)

            return Response({'data': serializer.data}, HTTP_200_OK)

        except Exception as e:
            return Response({'message': f'Internal error in getting replies for review! Error: {e}'}, HTTP_409_CONFLICT)

    def delete(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)
        try:
            id_reply = request.data['id']
            id_user = get_id_user(token)

            reply = ReplyReview.objects.get(id=id_reply, author_id=id_user)
            reply.delete()

            return Response({'message': 'Reply deleted successfully!'}, HTTP_200_OK)

        except ReplyReview.DoesNotExist:
            return Response({'message': 'Reply not found'}, HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'message': f'Internal error in deleting replies for review! Error: {e}'}, HTTP_409_CONFLICT)

    def put(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)
        try:
            id_reply = request.data['id']
            id_user = get_id_user(token)

            reply = ReplyReview.objects.get(id=id_reply, author_id=id_user)
            reply.comment = request.data['new_reply']
            reply.save()

            return Response({'message': 'Reply updated successfully!'}, HTTP_200_OK)

        except ReplyReview.DoesNotExist:
            return Response({'message': 'Reply not found'}, HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'message': f'Internal error in UPDATING replies for review! Error: {e}'}, HTTP_409_CONFLICT)

class LikeReviewView(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)
        try:
            id_review = request.data['review_id']
            id_user = get_id_user(token)

            data_like = {}
            data_like['review_id'] = id_review
            data_like['user'] = id_user

            serializer_like = LikeReviewSerializer(data=data_like)
            if serializer_like.is_valid():
                serializer_like.save()

            # dislike if like
            object_dislike = DislikeReview.objects.filter(review_id=id_review, user=id_user).first()
            if object_dislike:
                object_dislike.delete()

            number_of_likes = LikeReview.objects.filter(review_id=id_review).count()
            review = Review.objects.get(id=id_review)
            review.likes = number_of_likes
            if object_dislike:
                review.dislikes -= 1
            review.save()
            number_of_dislikes = review.dislikes

            return Response({'data': {'dislikes': number_of_dislikes, 'likes': number_of_likes}}, HTTP_200_OK)

        except Exception as e:
            return Response({'message': f'Internal error in like review! Error: {e}'}, HTTP_409_CONFLICT)

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)
        try:
            id_review = request.query_params['id']
            review_likes = LikeReview.objects.filter(review_id=id_review)
            review_likes_serializer = LikeReviewSerializer(review_likes, many=True)

            return Response({'data': review_likes_serializer.data})

        except Exception as e:
            return Response({'message': f'Internal error in like review! Error: {e}'}, HTTP_409_CONFLICT)


class DislikeReviewView(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)
        try:
            id_review = request.data['review_id']
            id_user = get_id_user(token)

            data_dislike = {}
            data_dislike['review_id'] = id_review
            data_dislike['user'] = id_user

            serializer_dislike = DislikeReviewSerializer(data=data_dislike)
            if serializer_dislike.is_valid():
                serializer_dislike.save()

            # like if dislike
            object_like = LikeReview.objects.filter(review_id=id_review, user=id_user).first()
            if object_like:
                object_like.delete()

            number_of_dislikes = DislikeReview.objects.filter(review_id=id_review).count()
            review = Review.objects.get(id=id_review)
            review.dislikes = number_of_dislikes
            if object_like:
                review.likes -= 1
            review.save()
            number_of_likes = review.likes

            return Response({'data': {'dislikes': number_of_dislikes, 'likes': number_of_likes}}, HTTP_200_OK)

        except Exception as e:
            return Response({'message': f'Internal error in dislike review! Error: {e}'}, HTTP_409_CONFLICT)

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)
        try:
            id_review = request.query_params['id']
            review_dislikes = DislikeReview.objects.filter(review_id=id_review)
            review_dislikes_serializer = DislikeReviewSerializer(review_dislikes, many=True)

            return Response({'data': review_dislikes_serializer.data}, HTTP_200_OK)
        except Exception as e:
            return Response({'message': f'Internal error in like review! Error: {e}'}, HTTP_409_CONFLICT)


class DescriptionAttraction(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)
        try:
            description = get_description(request.data['location'], request.data['city'])
            return Response({'data': description}, HTTP_200_OK)
        except Exception as e:
            return Response({'message': f'Internal error in getting description for location! Error: {e}'},
                            HTTP_409_CONFLICT)

class RelatedLocations(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')

        if token is None:
            return Response({'message': 'User not logged in!'}, HTTP_401_UNAUTHORIZED)
        try:
            related_attractions = get_related_attractions(request.data['lat'], request.data['lon'])

            return Response({'data': related_attractions}, HTTP_200_OK)
        except Exception as e:
            return Response({'message': f'Internal error in getting related locations! Error: {e}'},
                            HTTP_409_CONFLICT)