from api.DAL.data_context.database_connection import DatabaseConnection

import api.core.response as response

@DatabaseConnection
def token(token, cursor = None):

    cursor.execute("""
            UPDATE user
                SET user.token = %(value)s, 
                    user.token_exp = DATE_ADD(NOW(), INTERVAL 8 HOUR)
            
            WHERE user.id = %(id)s ;""",
            {'value': token.token_value, 'id': token.user_id} )

    return response.success()

@DatabaseConnection
def permissions(users, cursor = None):

    for user in users:
        cursor.execute("""
            UPDATE user
                SET user.permissions = %(permissions)s
            WHERE user.id = %(id)s;""",
            {'id': user.user_id, 'permissions': user.permissions} )

    return response.success()


@DatabaseConnection
def contact_information(user, cursor = None):

    cursor.execute("""
        UPDATE user
            SET user.first_name = %(first_name)s,
                user.last_name = %(last_name)s,
                user.email = %(email)s
        WHERE user.id = %(id)s;""",
        {'id': user.user_id, 'first_name': user.first_name, 'last_name': user.last_name, 'email': user.email} )

    return response.success()


@DatabaseConnection
def backup_frequency(user, cursor = None):

    cursor.execute("""
        UPDATE user
            SET user.backup_freq = %(backup_freq)s
        WHERE user.id = %(id)s;""",
        {'id': user.user_id, 'backup_freq': user.backup_freq} )

    return response.success()


@DatabaseConnection
def password(credentials, cursor = None):

    cursor.execute("""
        UPDATE user
            SET password = %(password)s
        WHERE user.id = %(id)s;""",
        {'id': credentials.id, 'password': credentials.password} )

    return response.success()