from api.DAL.data_context.database_connection import DatabaseConnection

import api.core.response as response
import api.core.sanitize as sanitize

from api.core.buisness_objects.transaction import Transaction

@DatabaseConnection
def update_transaction(transaction, cursor = None):

    cursor.execute('''
        UPDATE transactions
        SET account_id = %(a_id)s,
            vendor_id = %(v_id)s,
            invoice_date = %(in_date)s,
            date_paid = %(date_paid)s,
            invoice_no = %(in_no)s,
            description = %(desc)s,
            expense = %(expense)s,
            transaction_type_id = %(trans_type_id)s
        WHERE transaction_id =  %(trans_id)s;''',
        {'a_id': transaction.account_id, 'v_id': transaction.vendor_id, 'in_date': sanitize.date_for_storage(transaction.invoice_date), 
         'date_paid': sanitize.date_for_storage(transaction.date_paid), 'in_no': transaction.invoice_no, 'desc': transaction.description, 
         'expense': transaction.expense, 'trans_type_id': transaction.transaction_type_id, 'trans_id': transaction.transaction_id})

    return response.success()