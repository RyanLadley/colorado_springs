from api.DAL.data_context.database_connection import DatabaseConnection

import api.core.response as response
import api.core.sanitize as sanitize

from api.core.buisness_objects.vendor import Vendor

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