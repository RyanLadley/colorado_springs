from api.DAL.data_context.database_connection import DatabaseConnection

import api.core.response as response

@DatabaseConnection
def new_user(credentials, cursor = None):

    cursor.execute('''
        INSERT user (
                email, 
                first_name, 
                last_name, 
                password,
                permissions,
                backup_freq)
            VALUES (
                %(email)s, 
                %(first_name)s, 
                %(last_name)s, 
                %(password)s,
                %(permissions)s,
                1);''',
            {'email': credentials.email, 'first_name' : credentials.first_name, 'last_name': credentials.last_name, 'password' : credentials.password, 'permissions': credentials.permissions})

    return response.success()