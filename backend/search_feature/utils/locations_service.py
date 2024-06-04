import requests
from urllib.parse import quote
from .popular_destination_service import format_data
from ..models import Hotel, Restaurant
from ..serializers import HotelSerializer, RestaurantSerializer

api_category_id = {
    'hotel': '19014',
    'restaurant': '13065',
    'cafe': '13032',
    'museum': '10027',
    'supermarket': '17142',
    'park': '16032',
    'beach': '16003',
    'arts_entertainment': '10000',
}

available_type_of_destination_database = ['hotel', 'restaurant', 'cafe', 'supermarket', 'museum']


def get_locations_from_API(category, near, sort):
    url = ''
    if category == 'all':
        url = f"https://api.foursquare.com/v3/places/search?near={near}&sort=POPULARITY&limit=30"
    elif category.isnumeric():
        url = f"https://api.foursquare.com/v3/places/search?categories={category}&near={near}&sort={sort}&limit=30"
    else:
        url = f"https://api.foursquare.com/v3/places/search?categories={api_category_id[category]}&near={near}&sort={sort}&limit=30"

    headers = {
        "accept": "application/json",
        "Authorization": "fsq37BKRre0kAHrDWfzFGWqsClM0W8rQdv3npnqZKJmenow="
    }

    response = requests.get(url, headers=headers).json()

    return response


def format_locations_reponse(api_response):
    data = api_response
    locations_array = data['results']
    locations_response = []

    for location in locations_array:
        locations_response.append(format_data(location))

    return locations_response


# For Database we need to get fsq_id from API to get some details
def get_locations_from_database(category, location):
    if category in available_type_of_destination_database:
        if category == 'hotel':
            hotel = Hotel.objects.filter(addr_city=location)[:10]
            response = HotelSerializer(hotel, many=True)
            return response.data
        elif category == 'restaurant':
            restaurant = Restaurant.objects.filter(addr_city=location)[:10]
            response = RestaurantSerializer(restaurant, many=True)
            return response.data

    return []

def get_api_details_for_database_location(locations_object):

    locations_database = []

    for location in locations_object:
        id = location['id']
        name = quote(location['name'])
        latitude = location['lat']
        longitude = location['lon']

        url = f"https://api.foursquare.com/v3/places/match?name={name}&ll={latitude}%2C{longitude}"

        headers = {
            "accept": "application/json",
            "Authorization": "fsq37BKRre0kAHrDWfzFGWqsClM0W8rQdv3npnqZKJmenow="
        }

        response = requests.get(url, headers=headers).json()
        print(response)
        if 'place' in response:
            place_match_formated = format_data(response['place'])
            place_match_formated['id'] = id
            locations_database.append(place_match_formated)

    return locations_database