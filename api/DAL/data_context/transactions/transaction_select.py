from api.DAL.data_context.database_connection import DatabaseConnection

import api.core.response as response
import api.core.sanitize as sanitize

@DatabaseConnection
def types(cursor = None):

    cursor.execute("""
                SELECT  transaction_type_id,
                        transaction_type
                FROM transaction_types;""")

    results = cursor.fetchall() or {}

    transaction_types = []
    for row in results:
        transaction_types.append(row)

    return transaction_types