import requests


def get_destination_details(fsq_id, details_object):

    try:
        url = f"https://api.foursquare.com/v3/places/{fsq_id}"

        headers = {
            "accept": "application/json",
            "Authorization": "fsq37BKRre0kAHrDWfzFGWqsClM0W8rQdv3npnqZKJmenow="
        }

        response = requests.get(url, headers=headers).json()

        details_object['category_name'] = response['categories'][0]['name']
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
        url = f"https://api.foursquare.com/v3/places/{fsq_id}/photos?limit=10&sort=POPULAR"

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