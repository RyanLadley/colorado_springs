from api.DAL.data_context.database_connection import DatabaseConnection

import api.core.response as response
import api.core.sanitize as sanitize

from api.core.buisness_objects.invoice_accounts import InvoiceAccounts
from api.core.buisness_objects.vendor import Vendor

@DatabaseConnection
def invoice_accounts(transaction_ids, cursor = None):

    cursor.execute("""
            SELECT  account_id,
                    account_no,
                    expense
            FROM v_invoice_accounts
            WHERE transaction_id in %(transaction_ids)s;""",
            {'transaction_ids': transaction_ids})

    results = cursor.fetchall() or {}

    invoice_accounts = []
    for row in results:
        invoice_accounts.append(InvoiceAccounts.map_from_form(row))

    return invoice_accounts

@DatabaseConnection
def vendor(vendor_id, cursor = None):

    cursor.execute("""
                SELECT  name,
                        contract_no
                FROM v_vendors
                WHERE vendor_id = %(id)s;""",
                {'id': vendor_id})

    result = cursor.fetchone()

    vendor= Vendor.map_from_form(result)

    return vendor