from api.DAL.data_context.database_connection import DatabaseConnection

import api.core.response as response
import api.core.sanitize as sanitize

from api.core.buisness_objects.vendor import Vendor

@DatabaseConnection
def vendor_listing(cursor = None):

    cursor.execute("""
                SELECT  vendor_id, 
                        name, 
                        image_folder, 
                        image_file_name, 
                        image_file_type
                FROM v_vendors;""")

    results = cursor.fetchall() or {}

    vendors = []
    for row in results:
        vendors.append(Vendor.map_from_form(row))

    return vendors

@DatabaseConnection
def vendor_details(vendor_id, cursor = None):

    cursor.execute("""
                SELECT  vendor_id, 
                        name,
                        contract_no,
                        contract_start,
                        contract_end,
                        point_of_contact,
                        phone_no,
                        address,
                        city,
                        state,
                        zip,
                        email,
                        website, 
                        image_folder, 
                        image_file_name, 
                        image_file_type
                FROM v_vendors
                WHERE vendor_id = %(id)s;""",
                {'id': vendor_id})

    result = cursor.fetchone()

    vendor= Vendor.map_from_form(result)

    return vendor