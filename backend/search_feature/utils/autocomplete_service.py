import requests


def extract_specific_locations_from_json(locations):
    modified_locations = {}

    for index, location in enumerate(locations):
        modified_locations[f'location-{index}'] = location['text']

    return modified_locations


def get_autocomplete_destination(string):
    url = f"https://api.foursquare.com/v2/search/geoautocomplete?v=20231010&query={string}&oauth_token=3WU0KOMBG4YGZUPTK3Q1DYMFTXRZZJJQL0EKL0ZKKEB0WNPC"

    headers = {"accept": "application/json"}
    response = requests.get(url, headers=headers).json()
    print(response)

    return extract_specific_locations_from_json(response['response']['results'])

