from api.DAL.data_context.database_connection import DatabaseConnection

import api.core.response as response

import MySQLdb
import json

@DatabaseConnection
def new_ticket_batch(tickets, cursor = None):

    for ticket in tickets:
        cursor.execute('''
            INSERT tickets( 
                    vendor_id,
                    account_id,
                    date,
                    ticket_no,
                    material_id,
                    quantity,
                    cost,
                    district)
                VALUES (
                    %(vendor_id)s,
                    %(pprta_id)s,
                    %(date)s,
                    %(ticket_no)s,
                    %(material_id)s,
                    %(quantity)s,
                    %(cost)s,
                    %(district)s);''',
            {'vendor_id': ticket.vendor_id,  'pprta_id': ticket.account_id, 'date': ticket.date, 'ticket_no': ticket.ticket_no, 
            'material_id': ticket.material_id, 'quantity': ticket.quantity, 'cost': ticket.cost, 'district': ticket.district })

    return response.success()

