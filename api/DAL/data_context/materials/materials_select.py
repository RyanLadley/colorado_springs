from api.DAL.data_context.database_connection import DatabaseConnection
import sys

import api.core.response as response
import api.core.sanitize as sanitize

import api.DAL.data_context.city_accounts.city_accounts_select as city_accounts_select

from api.core.buisness_objects.transaction import Transaction
from api.core.buisness_objects.material import Material


@DatabaseConnection
def vendor_materials(vendor_id, cursor = None):

    cursor.execute("""
                SELECT  material_id,
                        name,
                        unit,
                        cost
                FROM v_vendor_materials
                WHERE vendor_id = %(vendor_id)s;""",
                {'vendor_id' : vendor_id})

    results = cursor.fetchall() or {}

    materials = []
    for row in results:
        materials.append(Material.map_from_form(row))

    return materials


@DatabaseConnection
def materials_listing(cursor = None):

    cursor.execute("""
                SELECT  material_id,
                        name,
                        unit
                FROM materials
                ORDER BY name;""")

    results = cursor.fetchall() or {}

    materials = []
    for row in results:
        materials.append(Material.map_from_form(row))

    return materials