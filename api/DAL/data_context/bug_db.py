from api.DAL.data_context.database_connection import DatabaseConnection


import api.core.response as response

@DatabaseConnection
def new_bug(bug_form, user_id, cursor = None):
    
    cursor.execute('''
        INSERT bugs (
                user_id,
                severity, 
                description, 
                status)
            VALUES (
                %(user_id)s,
                %(severity)s, 
                %(description)s, 
                "Open");''',
            {'user_id' : user_id, 'severity': bug_form.get('severity'), 'description' : bug_form.get('description').encode('utf-8')})

    return response.success()


@DatabaseConnection
def select_bugs(cursor = None):
    
    cursor.execute('''
        SELECT  severity,
                description,
                status
        FROM bugs;''')

    results = cursor.fetchall() or {}

    return results