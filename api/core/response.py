import json

def success(response = "none"):

    return standard_response(json.dumps(response), 'success')


def error(response = "none"):

    return standard_response(json.dumps(response), 'error')


def standard_response(response, status):

    return '{{"response" : {response}, "status" : "{status}"}}'.format(response = response, status = status)

def add_token(token, response = None):
    updated_response = json.loads(response or '{"status" : "success"}')
    updated_response['token'] = token.serialize()

    return json.dumps(updated_response)

