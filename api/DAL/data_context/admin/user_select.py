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
def confirmation_credentials(provided_credentials, cursor = None):
    
    cursor.execute("""
                SELECT  id,
                        password 
                FROM user
                WHERE id = %(id)s;""",
                {'id' : provided_credentials.id})

    row = cursor.fetchone() or {}
    
    stored_credentials = Credentials.map_from_form(row)

    return stored_credentials


@DatabaseConnection
def user(token, cursor = None):
    
    cursor.execute("""
                SELECT  id as user_id, 
                        email,
                        first_name,
                        last_name,
                        permissions
                FROM user
                WHERE id = %(id)s;""",
                {'id' : token.user_id})

    row = cursor.fetchone() or {}
    
    user = User.map_from_form(row)

    return user

@DatabaseConnection
def user_details(token, cursor = None):

    cursor.execute("""
                SELECT  id as user_id, 
                        email,
                        first_name,
                        last_name,
                        permissions,
                        backup_freq
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


@DatabaseConnection
def listing_with_permissions(cursor = None):

    cursor.execute("""
                SELECT  id as user_id,
                        email,
                        first_name,
                        last_name,
                        permissions
                FROM user
                ORDER BY last_name;""")

    results = cursor.fetchall() or {}

    users = []
    for row in results:
        users.append(User.map_from_form(row))

    return users


@DatabaseConnection
def backup_emails(cursor = None):

    cursor.execute("""
                SELECT  id as user_id,
                        email
                FROM user
                WHERE next_backup_email < NOW();""")

    results = cursor.fetchall() or {}

    user_ids = []
    recipients = []
    for row in results:
        user_ids.append(str(row.get("user_id")))
        recipients.append(row.get("email"))

    cursor.execute("""
        UPDATE user
        SET next_backup_email = NOW() + INTERVAL backup_freq DAY - INTERVAL 1 HOUR
        WHERE id IN %(user_ids)s""",
        {'user_ids': user_ids })

    return recipients
