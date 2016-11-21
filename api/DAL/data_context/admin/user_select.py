from api.DAL.data_context.database_connection import DatabaseConnection

from api.core.admin.user import User
from api.core.admin.credentials import Credentials
from api.core.admin.token import Token

import api.core.response as response

@DatabaseConnection
def login_credentials(provided_credentials, cursor = None):
    
    cursor.execute("""
                SELECT  id, 
                        email,
                        password 
                FROM user
                WHERE email = %(email)s;""",
                {'email' : provided_credentials.email})

    row = cursor.fetchone() or {}
    
    stored_credentials = Credentials.map_from_form(row)

    return stored_credentials


@DatabaseConnection
def user(token, cursor = None):
    
    cursor.execute("""
                SELECT  id, 
                        email,
                        first_name,
                        last_name
                FROM user
                WHERE id = %(id)s;""",
                {'id' : token.user_id})

    row = cursor.fetchone() or {}
    
    user = User.map_from_form(row)

    return user


@DatabaseConnection
def token(provided_token, cursor = None):

    cursor.execute("""
                SELECT  id as user_id, 
                        token as token_value
                FROM user
                WHERE id = %(id)s 
                  AND token_exp > NOW();""",
                {'id' : provided_token.user_id})

    row = cursor.fetchone() or {}
    
    stored_token = Token.map_from_form(row)

    return stored_token
