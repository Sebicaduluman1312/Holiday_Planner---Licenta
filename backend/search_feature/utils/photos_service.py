import requests

def add_photo_to_location(destinations_array):
    updated_destinations_array = []

    for destination in destinations_array:
        fsq_id = destination["fsq_id"]

        url = f"https://api.foursquare.com/v3/places/{fsq_id}/photos?limit=1&sort=NEWEST"
        headers = {
            "accept": "application/json",
            "Authorization": "fsq37BKRre0kAHrDWfzFGWqsClM0W8rQdv3npnqZKJmenow="
        }
        #TODO status
        response = requests.get(url, headers=headers)
        if len(response.text) > 50:
            photo_object = response.json()

            photo_url = photo_object[0]['prefix'] + 'original' + photo_object[0]['suffix']
            destination['photo_url'] = photo_url
            updated_destinations_array.append(destination)

    return updated_destinations_array
