# import requests
#
# def add_photo_to_location(destinations_array):
#     updated_destinations_array = []
#
#     for destination in destinations_array:
#         fsq_id = destination["fsq_id"]
#
#         url = f"https://api.foursquare.com/v3/places/{fsq_id}/photos?limit=1&sort=NEWEST"
#         headers = {
#             "accept": "application/json",
#             "Authorization": "fsq37BKRre0kAHrDWfzFGWqsClM0W8rQdv3npnqZKJmenow="
#         }
#         response = requests.get(url, headers=headers)
#         if len(response.text) > 50:
#             photo_object = response.json()
#
#             photo_url = photo_object[0]['prefix'] + 'original' + photo_object[0]['suffix']
#             destination['photo_url'] = photo_url
#             updated_destinations_array.append(destination)
#
#     return updated_destinations_array


import requests
from concurrent.futures import ThreadPoolExecutor

def add_photo_to_location(destinations_array):
    def fetch_photo(destination):
        fsq_id = destination["fsq_id"]
        url = f"https://api.foursquare.com/v3/places/{fsq_id}/photos?limit=1&sort=NEWEST"
        headers = {
            "accept": "application/json",
            "Authorization": "fsq37BKRre0kAHrDWfzFGWqsClM0W8rQdv3npnqZKJmenow="
        }
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            photo_object = response.json()
            if photo_object and len(photo_object) > 0:
                photo_url = photo_object[0]['prefix'] + 'original' + photo_object[0]['suffix']
                destination['photo_url'] = photo_url
        return destination

    with ThreadPoolExecutor() as executor:
        updated_destinations_array = list(executor.map(fetch_photo, destinations_array))

    updated_destinations_array = [destination for destination in updated_destinations_array if 'photo_url' in destination]

    return updated_destinations_array
