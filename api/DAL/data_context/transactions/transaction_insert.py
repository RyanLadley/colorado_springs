from api.DAL.data_context.database_connection import DatabaseConnection

import api.core.response as response
import api.core.sanitize as sanitize

from api.core.buisness_objects.transaction import Transaction

import api.DAL.data_context.tickets.tickets_update as tickets_update

@DatabaseConnection
def new_transaction(transaction, cursor = None):

    cursor.execute('''
        INSERT transactions( 
                account_id,
                vendor_id,
                invoice_date,
                date_paid,
                invoice_no,
                description,
                expense,
                transaction_type_id)
            VALUES (
                %(a_id)s,
                %(v_id)s,
                %(in_date)s,
                %(date_paid)s,
                %(in_no)s,
                %(desc)s,
                %(expense)s,
                %(trans_type_id)s);''',
        {'a_id': transaction.account_id, 'v_id': transaction.vendor_id, 'in_date': sanitize.date_for_storage(transaction.invoice_date), 
         'date_paid': sanitize.date_for_storage(transaction.date_paid), 'in_no': transaction.invoice_no, 'desc': transaction.description, 
         'expense': transaction.expense, 'trans_type_id': transaction.transaction_type_id})

    cursor.execute("""SELECT LAST_INSERT_ID();""")
    transaction_id = cursor.fetchone()['LAST_INSERT_ID()']

    assignments = []
    for assignment in transaction.city_account_assignments:
        assignments.append(tuple([transaction_id, int(assignment.city_account_id), assignment.amount]))

    cursor.executemany('''
        INSERT city_account_assignments( 
                transaction_id,
                city_account_id,
                amount)
            VALUES
                (%s, %s, %s);''',
         assignments)


    if len(transaction.tickets) > 0 :
        tickets_update.pending_tickets(transaction_id, transaction.tickets, cursor = cursor)

    return response.success()