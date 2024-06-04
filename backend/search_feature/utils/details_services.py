import requests, wikipedia
from ..utils.photos_service import add_photo_to_location
from ..utils.locations_service import format_locations_reponse


def get_destination_details(fsq_id, details_object):

    try:
        url = f"https://api.foursquare.com/v3/places/{fsq_id}"

        headers = {
            "accept": "application/json",
            "Authorization": "fsq37BKRre0kAHrDWfzFGWqsClM0W8rQdv3npnqZKJmenow="
        }

        response = requests.get(url, headers=headers).json()

        details_object['destination_category'] = response['categories'][0]['name']
        details_object['category_icon'] = response['categories'][0]['icon']['prefix'] + str(120) + \
                                          response['categories'][0]['icon']['suffix']
        details_object['lon'] = response['geocodes']['main']['longitude']
        details_object['lat'] = response['geocodes']['main']['latitude']
        details_object['name'] = response['name']
        details_object['country'] = response['location']['country']
        details_object['locality'] = response['location']['locality']
        details_object['address'] = response['location']['formatted_address']
    except Exception as e:
        print(e)


def get_destination_photos(fsq_id, details_object):
    try:
        url = f"https://api.foursquare.com/v3/places/{fsq_id}/photos?limit=50&sort=POPULAR"

        headers = {
            "accept": "application/json",
            "Authorization": "fsq37BKRre0kAHrDWfzFGWqsClM0W8rQdv3npnqZKJmenow="
        }

        response = requests.get(url, headers=headers).json()
        details_object['photos'] = []

        for destination in response:
            photo = destination['prefix'] + 'original' + destination['suffix']
            details_object['photos'].append(photo)

    except Exception as e:
        print(e)

def get_destination_rating(fsq_id, details_object):
    try:
        url = f"https://api.foursquare.com/v2/venues/{fsq_id}/?v=20231010&oauth_token=MLJWMY04CLIHRVQQG3FPQWOVYVDFY2Z5EEPLDTX3GUVBWAG0"

        headers = {"accept": "application/json"}

        response = requests.get(url, headers=headers).json()
        details_object['rating'] = response['response']['venue']['rating']
        details_object['counts'] = response['response']['venue']['stats']['tipCount']

    except Exception as e:
        print(e)

def get_related_attractions(lat, lon):
    try:
        url = f"https://api.foursquare.com/v3/places/search?ll={lat}%2C{lon}&radius=10000&sort=RELEVANCE&limit=10"

        headers = {
            "accept": "application/json",
            "Authorization": "fsq37BKRre0kAHrDWfzFGWqsClM0W8rQdv3npnqZKJmenow="
        }

        response = requests.get(url, headers=headers).json()
        related = add_photo_to_location(format_locations_reponse(response))
        for rel in related:
            rating = {}
            get_destination_rating(rel['fsq_id'], rating)
            rel['rating'] = rating['rating']

        return related

    except Exception as e:
        print(e)

def get_description(location, city):
    query = str(location) + ', ' + city
    try:
        data = wikipedia.summary(query)

    except wikipedia.PageError:
        try:
            data = wikipedia.summary(city)
        except wikipedia.PageError:
            data = "There is not description about this location, sorry..."

    return data;
