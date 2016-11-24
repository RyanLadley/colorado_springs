from api.DAL.data_context.database_connection import DatabaseConnection

import api.core.response as response
import api.core.sanitize as sanitize

from api.core.buisness_objects.vendor import Vendor

@DatabaseConnection
def update_vendor(vendor, cursor = None):

    cursor.execute('''
        UPDATE vendors
        SET name = %(name)s,
            contract_no = %(contract)s,
            contract_start = %(start)s,
            contract_end = %(end)s,
            point_of_contact = %(poc)s,
            phone_no = %(phone)s,
            address = %(address)s,
            city = %(city)s,
            state = %(state)s,
            zip = %(zip)s,
            email = %(email)s,
            website = %(website)s
        WHERE vendor_id = %(vendor_id)s;''',
        {'name': vendor.name, 'contract': vendor.contract_no, 'start': sanitize.date_for_storage(vendor.contract_start), 
         'end': sanitize.date_for_storage(vendor.contract_end), 'poc': vendor.point_of_contact, 'phone': vendor.phone_no, 
         'address': vendor.address, 'city': vendor.city, 'state': vendor.state, 'zip': vendor.zip, 'email': vendor.email, 
         'website': vendor.website, 'vendor_id': vendor.vendor_id})

    return response.success()


@DatabaseConnection
def update_vendor_with_image(vendor, cursor = None):

    update_vendor(vendor, cursor = cursor)

    if vendor.image.data: #Image has new data to write, so create new folder and file, otherwise defaults are used
        vendor.image.folder = str(int(int(vendor.vendor_id)/100))
        vendor.image.file_name = str(int(vendor.vendor_id)%100)

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
                %(file_type)s)
        ON DUPLICATE KEY
        UPDATE 
            folder = %(folder)s,
            file_name = %(file_name)s,
            file_type = %(file_type)s;''',
        {'vendor_id': vendor.vendor_id, 'folder': vendor.image.folder, 'file_name' : vendor.image.file_name, 'file_type' : vendor.image.type})

    vendor.image.save_to_file_system("api/DAL/images/vendors/")

    return response.success()