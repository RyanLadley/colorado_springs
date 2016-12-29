from api.core.workflow import workflow
from flask import request

import api.core.response as response
import api.core.sanitize as sanitize
import api.core.utilities as utilities


import api.DAL.data_context.materials.materials_insert as materials_insert
import api.DAL.data_context.materials.materials_select as materials_select

import api.DAL.data_context.vendor.vendor_update as vendor_update
import api.DAL.data_context.vendor.vendor_insert as vendor_insert
import api.DAL.data_context.vendor.vendor_select as vendor_select

from api.core.buisness_objects.vendor import Vendor
from api.core.buisness_objects.material import Material

from api.core.admin.authorize import authorize

import json

@workflow.route('/materials/table', methods = ['POST'])
@authorize()
def get_materials_table():
    """This function creates the materials overview table
    """

    vendors = vendor_select.vendor_with_materials_listings()
    materials = materials_select.materials_listing()
    
    for vendor in vendors:
        vendor.attatch_materials(materials_select.vendor_materials(vendor.vendor_id))

    table = []
    for material in materials:
        row = {}
        row["material"] = material.name
        for vendor in vendors:
            for vendor_material in vendor.materials:
                if vendor_material.material_id == material.material_id:
                    row[vendor.name] = str(vendor_material.cost) 
                    break
                row[vendor.name] = "N/A"
        table.append(row)

    return response.success({"table": table, "vendors": utilities.serialize_array(vendors)})
