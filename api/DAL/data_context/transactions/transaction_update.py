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

    assignment_ids = []
    for assignment in transaction.city_account_assignments:
        if(assignment.city_account_assignment_id):
            #Keep track of id's. This is used for deletion later
            assignment_ids.append(str(assignment.city_account_assignment_id))

    cursor.execute('''
        DELETE FROM city_account_assignments
        WHERE transaction_id = %(transaction_id)s
        AND city_account_assignment_id NOT IN %(known_ids)s ;''',
        {"transaction_id": transaction.transaction_id, 'known_ids': assignment_ids})

    #this loop is kept seperate from the above so we do not delete newly inserted records
    #TODO: See if we can combine these loops with a LAST_INSERTED_ID call
    for assignment in transaction.city_account_assignments:
        if(assignment.city_account_assignment_id):

            #Update Records with the known id
            cursor.execute('''
                UPDATE city_account_assignments
                SET city_account_id = %(city_account_id)s,
                    amount = %(amount)s
                WHERE city_account_assignment_id =  %(city_account_assignment_id)s;''',
                {'city_account_assignment_id': assignment.city_account_assignment_id, 'city_account_id': assignment.city_account_id, 'amount': assignment.amount})
          
        else:
            cursor.execute('''
                INSERT city_account_assignments( 
                       transaction_id,
                       city_account_id,
                       amount)
                VALUES(
                       %(transaction_id)s, 
                       %(city_account_id)s, 
                       %(amount)s);''',
                {'transaction_id': transaction.transaction_id, 'city_account_id': assignment.city_account_id, 'amount': assignment.amount})

    return response.success()


@DatabaseConnection
def delete_transaction(transaction_id, cursor = None):

    cursor.execute('''
        DELETE FROM transactions
        WHERE transaction_id =  %(trans_id)s;''',
        {'trans_id': transaction_id})


    cursor.execute('''
        DELETE FROM city_account_assignments
        WHERE transaction_id =  %(trans_id)s;''',
        {'trans_id': transaction_id})

    cursor.execute('''
        UPDATE tickets
        SET transaction_id = NULL
        WHERE transaction_id =  %(trans_id)s;''',
        {'trans_id': transaction_id})


    return response.success()


@DatabaseConnection
def update_pending_transaction(transaction, cursor = None):

    cursor.execute('''
        UPDATE transactions
        SET date_paid = %(date_paid)s,
            description = %(desc)s
        WHERE transaction_id =  %(trans_id)s;''',
        {'date_paid': sanitize.date_for_storage(transaction.date_paid), 'desc': transaction.description, 'trans_id': transaction.transaction_id})

    return response.success()