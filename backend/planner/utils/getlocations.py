import requests

def format_data(popular_destination_object):
    fsq_id = popular_destination_object['fsq_id']
    name = popular_destination_object['name']
    country = popular_destination_object['location']['country']
    locality = ''
    if 'location' in popular_destination_object and 'locality' in popular_destination_object['location']:
        locality = popular_destination_object['location']['locality']
    destination_category = popular_destination_object['categories'][0]['name']
    prefix_icon = popular_destination_object['categories'][0]['icon']['prefix']
    suffix_icon = popular_destination_object['categories'][0]['icon']['suffix']
    category_icon = prefix_icon + str(120) + suffix_icon
    lat = popular_destination_object['geocodes']['main']['latitude']
    lon = popular_destination_object['geocodes']['main']['longitude']

    custom_destination_attributes = {
        'fsq_id': str(fsq_id),
        'lat': float(lat),
        'lon': float(lon),
        'name': str(name),
        'country': str(country),
        'locality': str(locality),
        'destination_category': str(destination_category),
        'category_icon': str(category_icon),
    }

    return custom_destination_attributes

def get_polygon_locations(polygon):
    url = f"https://api.foursquare.com/v3/places/search?polygon={polygon}&sort=RELEVANCE&limit=50"

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