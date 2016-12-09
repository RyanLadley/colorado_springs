from api.DAL.data_context.database_connection import DatabaseConnection

import api.core.response as response

import MySQLdb
import json

@DatabaseConnection
def new_materials(materials, cursor = None):

    for material in materials:
        cursor.execute('''
            INSERT materials( 
                    name,
                    unit)
                VALUES (
                    %(name)s,
                    %(unit)s);''',
            {'name': material.name, 'unit': material.unit})
        cursor.execute("""SELECT LAST_INSERT_ID();""")
        material.material_id = cursor.fetchone()['LAST_INSERT_ID()']

    return materials



@DatabaseConnection
def vendor_materials(vendor, cursor = None):

    #Delete any materials associated with this vendor
    cursor.execute('''
        DELETE FROM vendor_materials
        WHERE vendor_id = %(vendor_id)s;''',
        {"vendor_id": vendor.vendor_id})

    #Replace With attactched materisl
    for material in vendor.materials:
        cursor.execute('''
            INSERT vendor_materials(
                    vendor_id, 
                    material_id,
                    cost)
                VALUES (
                    %(vendor_id)s,
                    %(material_id)s,
                    %(cost)s);''',
            {'vendor_id': vendor.vendor_id, 'material_id': material.material_id, 'cost' : material.cost})