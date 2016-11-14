from api.DAL.data_context.database_connection import DatabaseConnection

import api.core.response as response
import api.core.sanitize as sanitize

from api.core.buisness_objects.transaction import Transaction

@DatabaseConnection
def types(cursor = None):

    cursor.execute("""
                SELECT  transaction_type_id,
                        transaction_type
                FROM transaction_types;""")

    results = cursor.fetchall() or {}

    transaction_types = []
    for row in results:
        transaction_types.append(row)

    return transaction_types


@DatabaseConnection
def from_account_by_month(account, cursor = None):

    transactions_by_month = {}
    #Execute sotred procedure to get all transactions assigned to this account and its sub/shred accounts

    for month in range(1,13):
        cursor.execute("""
                SELECT  transaction_id,
                        account_id,
                        account_no,
                        sub_no,
                        shred_no,
                        vendor_id,
                        vendor_name,
                        invoice_no,
                        date_paid,
                        invoice_date,
                        description,
                        expense,
                        transaction_type_id,
                        transaction_type
                FROM v_transactions
                WHERE account_no = %(account_no)s
                    AND CASE WHEN %(sub_no)s IS NOT NULL
                             THEN sub_no = %(sub_no)s AND
                                CASE WHEN %(shred_no)s IS NOT NULL
                                     THEN shred_no = %(shred_no)s
                                     ELSE TRUE
                                END
                             ELSE True
                        END
                    AND Month(date_paid) = %(month)s;""",
                {'account_no': account.account_no, 'sub_no': account.sub_no, 'shred_no': account.shred_no, 'month': month})

        results = cursor.fetchall() or {}

        transactions = []
        for row in results:
            transactions.append(Transaction.map_from_form(row))

        transactions_by_month[str(month-1)] = transactions

    return transactions_by_month


@DatabaseConnection
def pending_by_vendor(vendor_id, cursor = None):

    cursor.execute("""
            SELECT  transaction_id,
                    account_id,
                    account_no,
                    sub_no,
                    shred_no,
                    vendor_id,
                    vendor_name,
                    invoice_no,
                    date_paid,
                    invoice_date,
                    description,
                    expense,
                    transaction_type_id,
                    transaction_type
            FROM v_transactions
            WHERE vendor_id = %(vendor_id)s AND
                  date_paid IS NULL;""",
            {'vendor_id': vendor_id})

    results = cursor.fetchall() or {}

    transactions = []
    for row in results:
        transactions.append(Transaction.map_from_form(row))

    return transactions

@DatabaseConnection
def by_vendor(vendor_id, cursor = None):

    cursor.execute("""
            SELECT  transaction_id,
                    account_id,
                    account_no,
                    sub_no,
                    shred_no,
                    vendor_id,
                    vendor_name,
                    invoice_no,
                    date_paid,
                    invoice_date,
                    description,
                    expense,
                    transaction_type_id,
                    transaction_type
            FROM v_transactions
            WHERE vendor_id = %(vendor_id)s;""",
            {'vendor_id': vendor_id})

    results = cursor.fetchall() or {}

    transactions = []
    for row in results:
        transactions.append(Transaction.map_from_form(row))

    return transactions