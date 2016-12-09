from api.DAL.data_context.database_connection import DatabaseConnection

import api.DAL.data_context.materials.materials_insert as materials_insert

import api.core.response as response
import api.core.sanitize as sanitize

from api.core.buisness_objects.vendor import Vendor

@DatabaseConnection
def new_vendor(vendor, cursor = None):

    cursor.execute('''
        INSERT vendors( 
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
                website)
            VALUES (
                %(name)s,
                %(contract)s,
                %(start)s,
                %(end)s,
                %(poc)s,
                %(phone)s,
                %(address)s,
                %(city)s,
                %(state)s,
                %(zip)s,
                %(email)s,
                %(website)s);''',
        {'name': vendor.name, 'contract': vendor.contract_no, 'start': sanitize.date_for_storage(vendor.contract_start), 
         'end': sanitize.date_for_storage(vendor.contract_end), 'poc': vendor.point_of_contact, 'phone': vendor.phone_no, 
         'address': vendor.address, 'city': vendor.city, 'state': vendor.state, 'zip': vendor.zip, 'email': vendor.email, 
         'website': vendor.website})


    cursor.execute("""SELECT LAST_INSERT_ID();""")
    vendor.vendor_id = cursor.fetchone()['LAST_INSERT_ID()']

    if vendor.image.data: #Image has new data to write, so create new folder and file, otherwise defaults are used
        vendor.image.folder = str(int(vendor.vendor_id/100))
        vendor.image.file_name = str(vendor.vendor_id%100)

    cursor.execute('''
        INSERT vendor_images(
                vendor_id, 
                folder,
                file_name,
                file_type)
            VALUES (
                %(vendor_id)s,
                %(folder)s,
                %(file_name)s,
                %(file_type)s);''',
        {'vendor_id': vendor.vendor_id, 'folder': vendor.image.folder, 'file_name' : vendor.image.file_name, 'file_type' : vendor.image.type})

    vendor.image.save_to_file_system("api/DAL/images/vendors/")

    materials_insert.vendor_materials(vendor, cursor = cursor)

    return response.success()

