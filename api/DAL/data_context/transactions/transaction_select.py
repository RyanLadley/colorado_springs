from api.DAL.data_context.database_connection import DatabaseConnection
import sys

import api.core.response as response
import api.core.sanitize as sanitize

import api.DAL.data_context.city_accounts.city_accounts_select as city_accounts_select
import api.DAL.data_context.tickets.tickets_select as tickets_select

from api.core.buisness_objects.transaction import Transaction

@DatabaseConnection
def types(cursor = None):

    cursor.execute("""
                SELECT  transaction_type_id,
                        transaction_type
                FROM transaction_types
                ORDER BY transaction_type;""")

    results = cursor.fetchall() or {}

    transaction_types = []
    for row in results:
        transaction_types.append(row)

    return transaction_types


@DatabaseConnection
def from_account_by_month(account, cursor = None):

    transactions_by_month = {}

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
def pending_by_account(account, cursor = None):

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
                AND Month(date_paid) IS NULL;""",
            {'account_no': account.account_no, 'sub_no': account.sub_no, 'shred_no': account.shred_no})

    results = cursor.fetchall() or {}

    transactions = []
    for row in results:
        transactions.append(Transaction.map_from_form(row))

    return transactions


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


@DatabaseConnection
def details(transaction_id, cursor = None):

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
            WHERE transaction_id = %(transaction_id)s;""",
            {'transaction_id': transaction_id})

    result = cursor.fetchone()
    transaction = Transaction.map_from_form(result)

    assignments = city_accounts_select.assignments_for_transaction(transaction_id, cursor = cursor)
    transaction.attatch_city_account_assignments(assignments)

    tickets = tickets_select.tickets_for_transaction(transaction_id, cursor = cursor)
    transaction.attatch_tickets(tickets)

    return transaction


@DatabaseConnection
def search_by_invoice(vendor_id, invoice_no, pprta_account_code_id, cursor = None):

    cursor.execute("""
            SELECT  transaction_id,
                    pprta_account_code_id,
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
            WHERE vendor_id LIKE %(vendor_id)s
                AND invoice_no LIKE %(invoice_no)s
                AND pprta_account_code_id LIKE %(pprta_id)s;""",
            {'vendor_id': vendor_id or '%', 'pprta_id' : pprta_account_code_id or '%',
             'invoice_no': "%{}%".format(invoice_no or "")})

    results = cursor.fetchall() or {}

    transactions = []
    for row in results:
        transactions.append(Transaction.map_from_form(row))

    return transactions


@DatabaseConnection
def transaction_by_muliple_ids(transaction_ids, cursor = None):

    id_string = ", ".join(str(ident) for ident in transaction_ids)

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
            WHERE transaction_id IN (%(transaction_ids)s)""",
            {'transaction_ids': id_string})

    results = cursor.fetchall() or {}

    transactions = []
    for row in results:
        transactions.append(Transaction.map_from_form(row))

    for transaction in transactions:
        transaction.attatch_city_account_assignments(city_accounts_select.assignments_for_transaction(transaction.transaction_id, cursor = cursor))

    return transactions