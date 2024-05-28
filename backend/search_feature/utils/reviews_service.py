import requests
import jwt
from ..models import Review
from django.shortcuts import get_object_or_404

def get_review_details_api(id_review, review_object):
    try:
        url = f"https://api.foursquare.com/v2/tips/{id_review}?v=20231010&oauth_token=MLJWMY04CLIHRVQQG3FPQWOVYVDFY2Z5EEPLDTX3GUVBWAG0"

        headers = {"accept": "application/json"}

        response = requests.get(url, headers=headers).json()

        review_object['name'] = response['response']['tip']['user']['firstName'] + ' ' + response['response']['tip']['user']['lastName']
        review_object['like'] = response['response']['tip']['agreeCount']

    except Exception as e:
        print(e)

def get_api_reviews(fsq_id, reviews):
    try:
        url = f"https://api.foursquare.com/v3/places/{fsq_id}/tips?limit=30"

        headers = {
            "accept": "application/json",
            "Authorization": "fsq37BKRre0kAHrDWfzFGWqsClM0W8rQdv3npnqZKJmenow="
        }

        response = requests.get(url, headers=headers).json()
        print(response)
        reviews['content'] = []

        for review in response:
            review_object = {}
            review_object['id'] = review['id']
            review_object['text'] = review['text']
            get_review_details_api(review_object['id'], review_object)
            reviews['content'].append(review_object)

    except Exception as e:
        print(e)

def make_review_object(token, review_object):
    user_data = jwt.decode(token, 'secret', algorithms=['HS256'])
    id_user = user_data['id']
    review_object['author'] = id_user


def get_id_user(token):
    user_data = jwt.decode(token, 'secret', algorithms=['HS256'])
    id_user = user_data['id']

    return id_user



