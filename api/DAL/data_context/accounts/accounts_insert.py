from api.DAL.data_context.database_connection import DatabaseConnection

from api.core.buisness_objects.account import Account
from api.core.buisness_objects.transaction import Transaction

import api.core.response as response

import MySQLdb
import json

@DatabaseConnection
def transfer(transfer, cursor = None):

    cursor.execute('''
        INSERT account_transfers( 
                from_account_id,
                to_account_id,
                amount,
                description,
                transfer_date)
            VALUES (
                %(f_id)s,
                %(t_id)s,
                %(amount)s,
                %(desc)s,
                CURDATE());''',
        {'f_id': transfer.from_account_id, 't_id': transfer.to_account_id, 'amount': transfer.amount, 'desc': transfer.description})

    return response.success()