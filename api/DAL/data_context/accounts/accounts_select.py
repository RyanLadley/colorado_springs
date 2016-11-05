from api.DAL.data_context.database_connection import DatabaseConnection

from api.core.buisness_objects.account import Account

import api.core.response as response
import MySQLdb
import json

@DatabaseConnection
def complete_account_listing(cursor = None):

    cursor.execute("""
                SELECT  account_id, 
                        account_no, 
                        sub_no, 
                        shred_no, 
                        description, 
                        annual_budget, 
                        transfer, 
                        total_budget, 
                        expedetures, 
                        remaining 
                FROM accounts
                WHERE sub_no IS NULL
                    AND shred_no IS NULL;""")

    results = cursor.fetchall() or {}

    acounts = []
    for row in results:
        accounts.append(Account.map_from_form(row))

    return projects