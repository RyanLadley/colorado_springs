from api.DAL.data_context.database_connection import DatabaseConnection

from api.core.buisness_objects.ticket import Ticket

import api.core.response as response

import MySQLdb
import json

@DatabaseConnection
def pending_tickets(vendor_id, account_id, cursor = None):

    cursor.execute("""
                SELECT  ticket_id,
                        vendor_id,
                        vendor_name,
                        account_id,
                        account_no,
                        sub_no,
                        shred_no,
                        date,
                        ticket_no,
                        material_id,
                        material_name,
                        quantity,
                        cost,
                        district,
                        transaction_id
                FROM v_tickets
                WHERE transaction_id IS NULL
                  AND vendor_id = %(vendor_id)s
                  AND account_id = %(account_id)s """,
                {'vendor_id' : vendor_id, 'account_id' : account_id})

    results = cursor.fetchall() or {}

    tickets = []
    for row in results:
        tickets.append(Ticket.map_from_form(row))

    return tickets


@DatabaseConnection
def ticket_search(vendor_id, account_id, ticket_no, cursor = None):

    cursor.execute("""
                SELECT  ticket_id,
                        vendor_id,
                        vendor_name,
                        account_id,
                        account_no,
                        sub_no,
                        shred_no,
                        date,
                        ticket_no,
                        material_id,
                        material_name,
                        quantity,
                        cost,
                        district,
                        transaction_id,
                        invoice_no
                FROM v_tickets
                WHERE vendor_id LIKE %(vendor_id)s
                  AND account_id LIKE %(account_id)s 
                  AND ticket_no LIKE %(ticket_no)s""",
                {'vendor_id' : vendor_id or '%', 'account_id' : account_id or '%', 'ticket_no': "%{}%".format(ticket_no) if ticket_no else '%'})

    results = cursor.fetchall() or {}

    tickets = []
    for row in results:
        tickets.append(Ticket.map_from_form(row))

    return tickets


@DatabaseConnection
def tickets_for_transaction(transaction_id, cursor = None):

    cursor.execute("""
                SELECT  ticket_id,
                        vendor_id,
                        vendor_name,
                        account_id,
                        account_no,
                        sub_no,
                        shred_no,
                        date,
                        ticket_no,
                        material_id,
                        material_name,
                        quantity,
                        cost,
                        district,
                        transaction_id
                FROM v_tickets
                WHERE transaction_id = %(transaction_id)s""",
                {'transaction_id' : transaction_id})

    results = cursor.fetchall() or {}

    tickets = []
    for row in results:
        tickets.append(Ticket.map_from_form(row))

    return tickets

@DatabaseConnection
def from_account_by_month(account, cursor = None):

    tickets_by_month = {}

    for month in range(1,13):
        cursor.execute("""
                    SELECT  ticket_id,
                            vendor_id,
                            vendor_name,
                            account_id,
                            account_no,
                            sub_no,
                            shred_no,
                            date,
                            ticket_no,
                            material_id,
                            material_name,
                            quantity,
                            cost,
                            district,
                            transaction_id
                    FROM v_tickets
                    WHERE account_no = %(account_no)s
                        AND CASE WHEN %(sub_no)s IS NOT NULL
                                 THEN sub_no = %(sub_no)s AND
                                    CASE WHEN %(shred_no)s IS NOT NULL
                                         THEN shred_no = %(shred_no)s
                                         ELSE TRUE
                                    END
                                 ELSE True
                            END
                        AND Month(date) = %(month)s;""",

                {'account_no' : account.account_no, "sub_no" : account.sub_no, "shred_no" : account.shred_no, 'month' : month})

        results = cursor.fetchall() or {}

        tickets = []
        for row in results:
            tickets.append(Ticket.map_from_form(row))

        tickets_by_month[str(month-1)] = tickets 

    return tickets_by_month

@DatabaseConnection
def tickets_for_vendor(vendor_id, cursor = None):

    cursor.execute("""
                SELECT  ticket_id,
                        vendor_id,
                        vendor_name,
                        account_id,
                        account_no,
                        sub_no,
                        shred_no,
                        date,
                        ticket_no,
                        material_id,
                        material_name,
                        quantity,
                        cost,
                        district,
                        transaction_id,
                        invoice_no
                FROM v_tickets
                WHERE vendor_id = %(vendor_id)s""",
                {'vendor_id' : vendor_id})

    results = cursor.fetchall() or {}

    tickets = []
    for row in results:
        tickets.append(Ticket.map_from_form(row))

    return tickets