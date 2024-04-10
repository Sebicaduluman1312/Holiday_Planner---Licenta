import requests
from ..serializers import PopularDestiatiosSerializer
def request_popular_destination():
    url = "https://api.foursquare.com/v3/places/search?near=Europe&sort=POPULARITY&limit=10"
    headers = {
        "accept": "application/json",
        "Authorization": "fsq37BKRre0kAHrDWfzFGWqsClM0W8rQdv3npnqZKJmenow="
    }
    response = requests.get(url, headers=headers)

    return response

def format_popular_data(popular_destination_object):
    fsq_id = popular_destination_object['fsq_id']
    name = popular_destination_object['name']
    country = popular_destination_object['location']['country']
    locality = popular_destination_object['location']['locality']
    destination_category = popular_destination_object['categories'][0]['name']
    prefix_icon = popular_destination_object['categories'][0]['icon']['prefix']
    suffix_icon = popular_destination_object['categories'][0]['icon']['suffix']
    category_icon = prefix_icon + str(120) + suffix_icon

    custom_destination_attributes = {
        'fsq_id': str(fsq_id),
        'name': str(name),
        'country': str(country),
        'locality': str(locality),
        'destination_category': str(destination_category),
        'category_icon': str(category_icon)
    }

    return custom_destination_attributes


def get_custom_destination_array(response):
    data = response.json()
    destinations_array = data['results']
    custom_array = []

    for destination in destinations_array:
        custom_array.append(format_popular_data(destination))

    return custom_array

def save_final_destination(data):
    for dest in data:
        serializer = PopularDestiatiosSerializer(data=dest)
        serializer.is_valid(raise_exception=True)
        serializer.save()

