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
                                        AND shred_no = v_accounts.shred_no
                                        AND invoice_date >= %(start_date)s
                                        AND invoice_date <= %(end_date)s) AS Decimal(10,2)) as expendetures

                        FROM v_accounts
                        WHERE account_no = %(account_no)s
                            AND sub_no = %(sub_no)s
                            AND shred_no IS NOT NULL;""",
                            {"account_no" : account.account_no, "sub_no" : account.sub_no, 'start_date' : start_date, 'end_date' : end_date})
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
                                   AND sub_no = v_accounts.sub_no
                                   AND invoice_date >= %(start_date)s
                                   AND invoice_date <= %(end_date)s) AS Decimal(10,2)) AS expendetures

                        FROM v_accounts
                        WHERE account_no = %(account_no)s 
                            AND sub_no IS NOT NULL
                            AND shred_no IS NULL ;""",
                            {"account_no" : account.account_no, 'start_date' : start_date, 'end_date' : end_date})

    else:
        #no account provideded, get all main accounts
        cursor.execute("""
                    SELECT  account_id, 
                            account_no, 
                            sub_no, 
                            shred_no, 

                            CAST((SELECT COALESCE(SUM(expense),0)
                                FROM v_transactions
                                WHERE account_no = v_accounts.account_no
                                    AND invoice_date >= %(start_date)s
                                    AND invoice_date <= %(end_date)s) AS Decimal(10,2))  AS expendetures

                    FROM v_accounts
                    WHERE sub_no IS NULL
                        AND shred_no IS NULL;""",
                        {'start_date' : start_date, 'end_date' : end_date})

    
    results = cursor.fetchall() or {}

    accounts = []
    for row in results:
        accounts.append(Account.map_from_form(row))

    return accounts


@DatabaseConnection
def tickets(start_date, end_date, vendor_id, cursor = None):

    cursor.execute("""
                SELECT  account_no,
                        sub_no,
                        shred_no,
                        SUM(CASE WHEN transaction_id IS NULL THEN cost ELSE 0 END) as pending,
                        SUM(CASE WHEN transaction_id IS NOT NULL THEN cost ELSE 0 END) as expensed

                FROM v_tickets
                WHERE vendor_id LIKE %(vendor_id)s
                    AND date >= %(start_date)s
                    AND date <= %(end_date)s
                GROUP BY account_id
                ORDER BY account_no;""",
                {'vendor_id': vendor_id or '%', 'start_date' : start_date, 'end_date' : end_date})

    result = cursor.fetchall() or {}

    return result