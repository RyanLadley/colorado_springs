from api.DAL.data_context.database_connection import DatabaseConnection

import api.core.response as response
import api.core.sanitize as sanitize

from api.core.buisness_objects.transaction import Transaction

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

    return response.success()