import jwt
def get_user_id(token):

    data = jwt.decode(token, 'secret', algorithms=['HS256'])
    id_user = data['id']

    return id_user