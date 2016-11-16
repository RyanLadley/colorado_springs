from flask import request

import api.DAL.data_context.admin.user_update as user_update
import api.DAL.data_context.admin.user_select as user_select

from api.core.admin.credentials import Credentials
from api.core.admin.token import Token

from api.core.admin.validate import InvalidCredential
import api.core.admin.validate as validate

import api.core.response as response
import api.core.sanitize as sanitize

from functools import wraps
import json



def authorize():
    def deceratror(function):
        @wraps(function)
        def check_authorization(*args, **kwargs):

            # If the function is not a direct api_repsonse, it means it credentials have already been checked
            #So we return the function itself
            if(kwargs.get('api_response', True)):
                updated_token = None
                try:
                    updated_token = process_token(json.loads(request.form['token']))
                    
                except InvalidCredential as invalid:
                    return response.error(invalid.args[0])

                except AccessDenied as denied:
                    error = response.error(denied.args[0])
                    mesg = response.add_token(updated_token, error)
                    return mesg


                return response.add_token(updated_token, function(*args, **kwargs))
            
            else:
                return function(*args, **kwargs)
        
        return check_authorization
    return deceratror


def process_token(token_form):

    token_form = json.loads(request.form['token'])
    token_form = sanitize.form_keys(token_form)

    provided_token = Token.map_from_form(token_form)
    stored_token = user_select.token(provided_token)
    
    validate.token(stored_token, provided_token) #Exception thrown if token is ivalid
    
    #TODO: Update app to allow update of token on every call
    provided_token.update() 
    user_update.token(provided_token)

    return provided_token

def project_access(project_id, token):

    if project_id:
        if not user_select.project_access(project_id, token):
            raise AccessDenied("Project Access Denied")

class AccessDenied(Exception):
    pass




    
