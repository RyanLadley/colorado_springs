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

@DatabaseConnection
def ticket(ticket, cursor = None):

    cursor.execute('''
        UPDATE tickets
        SET vendor_id = %(vendor_id)s,
            pprta_id = %(pprta_id)s,
            date = %(date)s,
            ticket_no = %(ticket_no)s,
            material_id = %(material_id)s,
            quantity = %(quantity)s,
            cost = %(cost)s,
            district = %(district)s
        WHERE ticket_id = %(ticket_id)s;''',  

            {'ticket_id' : ticket.ticket_id, 'vendor_id': ticket.vendor_id,  'pprta_id': ticket.pprta_id, 'date': ticket.date, 'ticket_no': ticket.ticket_no, 
            'material_id': ticket.material_id, 'quantity': ticket.quantity, 'cost': ticket.cost, 'district': ticket.district })


    return response.success()


@DatabaseConnection
def delete_ticket(ticket_id, cursor = None):

    cursor.execute('''
        DELETE FROM tickets
        WHERE ticket_id =  %(ticket_id)s;''',
        {'ticket_id': ticket_id})

    return response.success()