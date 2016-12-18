from api.DAL.data_context.database_connection import DatabaseConnection

import api.core.response as response
import api.core.sanitize as sanitize


@DatabaseConnection
def pending_tickets(transaction_id, tickets, cursor = None):

    for ticket in tickets:
        cursor.execute('''
            UPDATE tickets
            SET transaction_id = %(transaction_id)s
            WHERE ticket_id = %(ticket_id)s;''',
            {'transaction_id': transaction_id, 'ticket_id' : ticket.ticket_id})

    return response.success()