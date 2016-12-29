from api.DAL.data_context.database_connection import DatabaseConnection

import api.core.response as response
import api.core.sanitize as sanitize

from api.core.buisness_objects.transaction import Transaction

@DatabaseConnection
def accounts_budget(accounts, cursor = None):

    for account in accounts:
        cursor.execute('''
            UPDATE accounts
            SET annual_budget = %(annual_budget)s
            WHERE account_id =  %(account_id)s;''',
            {'account_id': account.account_id, 'annual_budget': account.annual_budget})