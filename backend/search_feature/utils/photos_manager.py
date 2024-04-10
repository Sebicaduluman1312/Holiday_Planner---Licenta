import requests

def add_photo_to_location(destinations_array):
    for destination in destinations_array:
        fsq_id = destination["fsq_id"]

        url = f"https://api.foursquare.com/v3/places/{fsq_id}/photos?limit=1&sort=POPULAR&classifications=outdoor"
        headers = {
            "accept": "application/json",
            "Authorization": "fsq37BKRre0kAHrDWfzFGWqsClM0W8rQdv3npnqZKJmenow="
        }
        response = requests.get(url, headers=headers)

        if response.ok:
            photo_object = response.json()
            photo_url = photo_object[0]['prefix'] + 'original' + photo_object[0]['suffix']
            destination['photo_url'] = photo_url
        else:
            return 'Failed to fetch photo for location'

    return destinations_array
