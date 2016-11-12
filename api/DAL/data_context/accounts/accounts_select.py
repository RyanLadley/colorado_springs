from api.DAL.data_context.database_connection import DatabaseConnection

from api.core.buisness_objects.account import Account
from api.core.buisness_objects.transaction import Transaction

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

@DatabaseConnection
def account_details(account_id, cursor = None):

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
                WHERE account_id = %(account_id)s;""",
            {'account_id' : account_id})

    result = cursor.fetchone()
    account = Account.map_from_form(result)
    
    monthly_summary = {}
    #Execute sotred procedure to get all transactions assigned to this account and its sub/shred accounts
    for month in range(1,13):
        cursor.execute("""
                    CALL get_account_transactions_by_month(%(account_no)s, %(sub_no)s,%(shred_no)s, %(month)s)""",
                    {'account_no': account.account_no, 'sub_no': account.sub_no, 'shred_no': account.shred_no, 'month': month})

        results = cursor.fetchall() or {}

        transactions = []
        for row in results:
            transactions.append(Transaction.map_from_form(row))

        monthly_summary[str(month-1)] = transactions

    account.attach_monthly_summary(monthly_summary)

    return account