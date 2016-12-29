from api.DAL.data_context.database_connection import DatabaseConnection

import api.DAL.data_context.accounts.accounts_select as accounts_select
import api.DAL.data_context.transactions.transaction_select as transaction_select
import api.DAL.data_context.city_accounts.city_accounts_select as city_accounts_select

from api.core.buisness_objects.account import Account
from api.core.buisness_objects.pprta_codes import PPRTACodes
from api.core.buisness_objects.account_transfer import AccountTransfer
from api.core.buisness_objects.transaction import Transaction
from api.core.buisness_objects.pprta_codes import PPRTACodes


import MySQLdb
import json

@DatabaseConnection
def expense(start_date, end_date, account_id, cursor = None):

    if(account_id):
        account = accounts_select.account_name(account_id, cursor = cursor)

        if(account.sub_no):
            #Get Shred Outs of Given Sub Account
            cursor.execute("""
                        SELECT  account_id, 
                                account_no, 
                                sub_no, 
                                shred_no, 

                                CAST((SELECT COALESCE(SUM(expense),0)
                                    FROM v_transactions
                                    WHERE account_no = v_accounts.account_no
                                        AND sub_no = v_accounts.sub_no
                                        AND shred_no = v_accounts.shred_no) AS Decimal(10,2)) as expendetures

                        FROM v_accounts
                        WHERE account_no = %(account_no)s 
                            AND sub_no = %(sub_no)s
                                AND shred_no IS NOT NULL;""",
                            {"account_no" : account.account_no, "sub_no" : account.sub_no})
        else:
            #Get Sub Accounts of provided account
            cursor.execute("""
                        SELECT  account_id, 
                                account_no, 
                                sub_no, 
                                shred_no, 

                                CAST((SELECT COALESCE(SUM(expense),0)
                                FROM v_transactions
                                WHERE account_no = v_accounts.account_no
                                   AND sub_no = v_accounts.sub_no) AS Decimal(10,2)) AS expendetures

                        FROM v_accounts
                        WHERE account_no = %(account_no)s 
                            AND sub_no IS NOT NULL
                            AND shred_no IS NULL;""",
                            {"account_no" : account.account_no})

    else:
        #no account provideded, get all main accounts
        cursor.execute("""
                    SELECT  account_id, 
                            account_no, 
                            sub_no, 
                            shred_no, 

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

    return accounts