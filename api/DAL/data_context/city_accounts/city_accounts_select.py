from api.DAL.data_context.database_connection import DatabaseConnection

from api.core.buisness_objects.city_account import CityAccount
from api.core.buisness_objects.city_account_assignment import CityAccountAssignment

import json

@DatabaseConnection
def city_account_listing(cursor = None):

    cursor.execute("""
                SELECT  city_account_id, 
                        account_no, 
                        title 
                        
                FROM city_accounts;""")

    results = cursor.fetchall() or {}

    accounts = []
    for row in results:
        accounts.append(CityAccount.map_from_form(row))

   
    return accounts

@DatabaseConnection
def city_account_assignments_for_transaction(transaction_id, cursor = None):

    cursor.execute("""
                SELECT  city_account_assignment_id, 
                        transaction_id,
                        city_account_id,
                        city_account_no,
                        amount 
                        
                FROM v_city_account_assignments
                WHERE transaction_id = %(transaction_id)s;""",
                {'transaction_id': transaction_id})

    results = cursor.fetchall() or {}

    assignments = []
    for row in results:
        assignments.append(CityAccountAssignment.map_from_form(row))

   
    return assignments
