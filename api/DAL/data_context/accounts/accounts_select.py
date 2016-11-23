from api.DAL.data_context.database_connection import DatabaseConnection

from api.core.buisness_objects.account import Account
from api.core.buisness_objects.pprta_codes import PPRTACodes
from api.core.buisness_objects.account_transfer import AccountTransfer
from api.core.buisness_objects.transaction import Transaction
from api.core.buisness_objects.pprta_codes import PPRTACodes

import api.DAL.data_context.transactions.transaction_select as transaction_select

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

                        ((SELECT COALESCE(SUM(amount),0)
                         FROM v_account_transfers
                         WHERE to_account_no = v_accounts.account_no) 
                        -
                        (SELECT COALESCE(SUM(amount),0)
                         FROM v_account_transfers
                         WHERE from_account_no = v_accounts.account_no) ) AS transfer, 

                        CAST((SELECT COALESCE(SUM(expense),0)
                            FROM v_transactions
                            WHERE account_no = v_accounts.account_no) AS Decimal(10,2))  AS expendetures
                FROM v_accounts
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
                            
                            ((SELECT COALESCE(SUM(amount),0)
                             FROM v_account_transfers
                             WHERE to_account_no = v_accounts.account_no
                                AND to_sub_no = v_accounts.sub_no) 
                            -
                            (SELECT COALESCE(SUM(amount),0)
                             FROM v_account_transfers
                             WHERE from_account_no = v_accounts.account_no
                                AND from_sub_no = v_accounts.sub_no) ) AS transfer, 

                            CAST((SELECT COALESCE(SUM(expense),0)
                                FROM v_transactions
                                WHERE account_no = v_accounts.account_no
                                   AND sub_no = v_accounts.sub_no) AS Decimal(10,2)) AS expendetures

                    FROM v_accounts
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
                                
                                ((SELECT COALESCE(SUM(amount),0)
                                 FROM v_account_transfers
                                 WHERE to_account_no = v_accounts.account_no
                                    AND to_sub_no = v_accounts.sub_no
                                    AND to_shred_no = v_accounts.shred_no) 
                                -
                                (SELECT COALESCE(SUM(amount),0)
                                 FROM v_account_transfers
                                 WHERE from_account_no = v_accounts.account_no
                                    AND from_sub_no = v_accounts.sub_no
                                    AND from_shred_no = v_accounts.shred_no) ) AS transfer, 

                                CAST((SELECT COALESCE(SUM(expense),0)
                                    FROM v_transactions
                                    WHERE account_no = v_accounts.account_no
                                        AND sub_no = v_accounts.sub_no
                                        AND shred_no = v_accounts.shred_no) AS Decimal(10,2)) as expendetures

                            FROM v_accounts
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
                FROM v_accounts
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
                    FROM v_accounts
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
                        FROM v_accounts
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

                        ((SELECT COALESCE(SUM(amount),0)
                             FROM v_account_transfers
                             WHERE to_account_no = v_accounts.account_no AND
                                    CASE WHEN v_accounts.sub_no IS NOT NULL
                                        THEN to_sub_no = v_accounts.sub_no AND
                                            CASE WHEN v_accounts.shred_no IS NOT NULL
                                                 THEN to_shred_no = v_accounts.shred_no
                                                 ELSE TRUE
                                            END
                                         ELSE True
                                    END)
                            -
                            (SELECT COALESCE(SUM(amount),0)
                             FROM v_account_transfers
                             WHERE from_account_no = v_accounts.account_no AND
                                    CASE WHEN v_accounts.sub_no IS NOT NULL
                                         THEN from_sub_no = v_accounts.sub_no AND
                                            CASE WHEN v_accounts.shred_no IS NOT NULL
                                                 THEN from_shred_no = v_accounts.shred_no
                                                 ELSE TRUE
                                            END
                                         ELSE True
                                    END)) AS transfer,

                        (SELECT COALESCE(SUM(expense),0)
                         FROM v_transactions
                         WHERE account_no = v_accounts.account_no AND
                            CASE WHEN v_accounts.sub_no IS NOT NULL
                                 THEN sub_no = v_accounts.sub_no AND
                                     CASE WHEN v_accounts.shred_no IS NOT NULL
                                          THEN shred_no = v_accounts.shred_no
                                          ELSE TRUE
                                     END
                                 ELSE True
                            END)  as expendetures
                FROM v_accounts
                WHERE account_id = %(account_id)s;""",
            {'account_id' : account_id})

    result = cursor.fetchone()
    account = Account.map_from_form(result)
    
    
    #Execute sotred procedure to get all transactions assigned to this account and its sub/shred accounts
    monthly_summary = transaction_select.from_account_by_month(account)

    account.attach_monthly_summary(monthly_summary)

    return account

@DatabaseConnection
def account_name(account_id, cursor = None):

    cursor.execute("""
                SELECT  account_id, 
                        account_no, 
                        sub_no, 
                        shred_no
                FROM v_accounts
                WHERE account_id = %(account_id)s;""",
            {'account_id' : account_id})

    result = cursor.fetchone()
    account = Account.map_from_form(result)
    
    return account

@DatabaseConnection
def transfers(account, cursor = None):

    cursor.execute("""
                SELECT  from_account_id,
                        from_account_no,
                        from_sub_no,
                        from_shred_no,
                        to_account_id,
                        to_account_no,
                        to_sub_no,
                        to_shred_no,
                        description,
                        amount,
                        transfer_date

                FROM v_account_transfers                        
                WHERE   (from_account_no = %(account_no)s AND
                            CASE WHEN %(sub_no)s IS NOT NULL
                                 THEN from_sub_no = %(sub_no)s AND
                                     CASE WHEN %(shred_no)s IS NOT NULL
                                          THEN from_shred_no = %(shred_no)s
                                          ELSE TRUE
                                     END
                                 ELSE True
                            END)
                    XOR
                        (to_account_no = %(account_no)s AND
                            CASE WHEN %(sub_no)s IS NOT NULL
                                 THEN to_sub_no = %(sub_no)s AND
                                     CASE WHEN %(shred_no)s IS NOT NULL
                                          THEN to_shred_no = %(shred_no)s
                                          ELSE TRUE
                                     END
                                 ELSE True
                            END);""",
            {'account_no': account.account_no, 'sub_no': account.sub_no, 'shred_no': account.shred_no})

    results = cursor.fetchall() or {}

    transfers = []
    for row in results:
        transfers.append(AccountTransfer.map_from_form(row))
    
    return transfers

@DatabaseConnection
def pprta_codes(account_id, cursor = None):

    cursor.execute("""
                SELECT pprta_account_code_id,
                       account_no,
                       fund_no,
                       dept_no,
                       project_no,
                       project_description,
                       account_prefix

                FROM v_accounts
                WHERE account_id = %(account_id)s;""",
            {'account_id': account_id})

    result = cursor.fetchone()
    codes = PPRTACodes.map_from_form(result)
    
    return codes

@DatabaseConnection
def pprta_project_listing( cursor = None):

    cursor.execute("""
                SELECT pprta_account_code_id,
                       account_no,
                       project_description

                FROM pprta_account_codes;""")

    results = cursor.fetchall() or {}

    codes = []
    for row in results:
        codes.append(PPRTACodes.map_from_form(row))
    
    return codes