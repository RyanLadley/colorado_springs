from api.core.workflow import workflow
from flask import request

import api.core.response as response
import api.core.sanitize as sanitize
import api.core.utilities as utilities

import api.DAL.data_context.vendor.vendor_insert as vendor_insert
import api.DAL.data_context.vendor.vendor_select as vendor_select

from api.core.buisness_objects.vendor import Vendor


import json

@workflow.route('/vendor/new', methods = ['POST'])
def new_vendor():

    vendor_form = json.loads(request.form['payload'])
    vendor_form = sanitize.form_keys(vendor_form)

    vendor = Vendor.map_from_form(vendor_form)

    return vendor_insert.new_vendor(vendor)

@workflow.route('/vendor/listing', methods = ['POST'])
def vendor_listing():

    vendors = vendor_select.vendor_listing()

    serialized_vendors = utilities.serialize_array(vendors)

    return response.success(serialized_vendors)
    

@workflow.route('/vendor/details/<vendor_id>', methods = ['POST'])
def vendor_details(vendor_id):

    vendor = vendor_select.vendor_details(vendor_id)

    return response.success(vendor.serialize())