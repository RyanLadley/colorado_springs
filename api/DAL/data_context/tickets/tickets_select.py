from api.DAL.data_context.database_connection import DatabaseConnection

from api.core.buisness_objects.ticket import Ticket

import api.core.response as response

import MySQLdb
import json

@DatabaseConnection
def pending_tickets(vendor_id, project_id, cursor = None):

    cursor.execute("""
                SELECT  ticket_id,
                        vendor_id,
                        vendor_name,
                        pprta_id,
                        project_no,
                        project_description,
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
                  AND pprta_id = %(project_id)s """,
                {'vendor_id' : vendor_id, 'project_id' : project_id})

    results = cursor.fetchall() or {}

    tickets = []
    for row in results:
        tickets.append(Ticket.map_from_form(row))

    return tickets


@DatabaseConnection
def ticket_search(vendor_id, project_id, ticket_no, cursor = None):

    cursor.execute("""
                SELECT  ticket_id,
                        vendor_id,
                        vendor_name,
                        pprta_id,
                        project_no,
                        project_description,
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
                  AND pprta_id LIKE %(project_id)s 
                  AND ticket_no LIKE %(ticket_no)s""",
                {'vendor_id' : vendor_id or '%', 'project_id' : project_id or '%', 'ticket_no': "%{}%".format(ticket_no) if ticket_no else '%'})

    results = cursor.fetchall() or {}

    tickets = []
    for row in results:
        print(row)
        tickets.append(Ticket.map_from_form(row))

    return tickets


@DatabaseConnection
def tickets_for_transaction(transaction_id, cursor = None):

    cursor.execute("""
                SELECT  ticket_id,
                        vendor_id,
                        vendor_name,
                        pprta_id,
                        project_no,
                        project_description,
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
def tickets_for_vendor(vendor_id, cursor = None):

    cursor.execute("""
                SELECT  ticket_id,
                        vendor_id,
                        vendor_name,
                        pprta_id,
                        project_no,
                        project_description,
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