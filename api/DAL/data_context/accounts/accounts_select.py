from api.DAL.data_context.database_connection import DatabaseConnection

from api.core.buisness_objects.account import Account


import MySQLdb
import json

@DatabaseConnection
def accounts_overview(cursor = None):

    cursor.execute("""
                SELECT  account_id, 
                        account_no, 
                        sub_no, 
                        shred_no, 
                        description, 
                        annual_budget, 
                        transfer, 
                        total_budget, 
                        expendetures, 
                        remaining 
                FROM accounts
                WHERE sub_no IS NULL
                    AND shred_no IS NULL;""")

    results = cursor.fetchall() or {}

    accounts = []
    for row in results:
        accounts.append(Account.map_from_form(row))

    #Attatch Sub Accounts to main accounts
    for account in accounts:
        cursor.execute("""
                    SELECT  account_id, 
                            account_no, 
                            sub_no, 
                            shred_no, 
                            description, 
                            annual_budget, 
                            transfer, 
                            total_budget, 
                            expendetures, 
                            remaining 
                    FROM accounts
                    WHERE account_no = %(account_number)s
                        AND sub_no IS NOT NULL
                        AND shred_no IS NULL;""",
                    {'account_number': account.account_no})

        results = cursor.fetchall() or {}

        sub_accounts = []
        for row in results:
            sub_accounts.append(Account.map_from_form(row))

        #attach shred-out accounts to subaccounts
        for sub_account in sub_accounts:
            cursor.execute("""
                        SELECT  account_id, 
                                account_no, 
                                sub_no, 
                                shred_no, 
                                description, 
                                annual_budget, 
                                transfer, 
                                total_budget, 
                                expendetures, 
                                remaining 
                        FROM accounts
                        WHERE account_no = %(account_number)s
                            AND sub_no = %(sub_account_number)s
                            AND shred_no IS NOT NULL;""",
                        {'account_number': account.account_no, 'sub_account_number': sub_account.sub_no})

            results = cursor.fetchall() or {}

            shred_accounts = []
            for row in results:
                shred_accounts.append(Account.map_from_form(row))
            sub_account.attach_sub_accounts(shred_accounts)


        account.attach_sub_accounts(sub_accounts)


    return accounts

@DatabaseConnection
def account_numbers(cursor = None):

    cursor.execute("""
                SELECT  account_id, 
                        account_no
                FROM accounts
                WHERE sub_no IS NULL
                    AND shred_no IS NULL;""")

    results = cursor.fetchall() or {}

    accounts = []
    for row in results:
        accounts.append(Account.map_from_form(row))

    #Attatch Sub Accounts to main accounts
    for account in accounts:
        cursor.execute("""
                    SELECT  account_id, 
                            account_no, 
                            sub_no
                    FROM accounts
                    WHERE account_no = %(account_number)s
                        AND sub_no IS NOT NULL
                        AND shred_no IS NULL;""",
                    {'account_number': account.account_no})

        results = cursor.fetchall() or {}

        sub_accounts = []
        for row in results:
            sub_accounts.append(Account.map_from_form(row))

        #attach shred-out accounts to subaccounts
        for sub_account in sub_accounts:
            cursor.execute("""
                        SELECT  account_id, 
                                account_no, 
                                sub_no, 
                                shred_no
                        FROM accounts
                        WHERE account_no = %(account_number)s
                            AND sub_no = %(sub_account_number)s
                            AND shred_no IS NOT NULL;""",
                        {'account_number': account.account_no, 'sub_account_number': sub_account.sub_no})

            results = cursor.fetchall() or {}

            shred_accounts = []
            for row in results:
                shred_accounts.append(Account.map_from_form(row))
            sub_account.attach_sub_accounts(shred_accounts)


        account.attach_sub_accounts(sub_accounts)


    return accounts