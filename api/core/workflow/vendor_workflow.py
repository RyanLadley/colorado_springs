from api.core.workflow import workflow
from flask import request

import api.core.response as response
import api.core.sanitize as sanitize
import api.core.utilities as utilities


import api.DAL.data_context.materials.materials_insert as materials_insert
import api.DAL.data_context.materials.materials_select as materials_select

import api.DAL.data_context.tickets.tickets_select as tickets_select

import api.DAL.data_context.transactions.transaction_select as transaction_select

import api.DAL.data_context.vendor.vendor_update as vendor_update
import api.DAL.data_context.vendor.vendor_insert as vendor_insert
import api.DAL.data_context.vendor.vendor_select as vendor_select

from api.core.buisness_objects.vendor import Vendor
from api.core.buisness_objects.material import Material

from api.core.admin.authorize import authorize

import json

@workflow.route('/vendor/new', methods = ['POST'])
@authorize()
def new_vendor():

    vendor_form = json.loads(request.form['payload'])

    vendor = Vendor.map_from_form(vendor_form)

    #Insert New Materials into database
    materials = []
    for material in vendor_form.get('new_materials') or []:
        materials.append(Material.map_from_form(material))
    materials = materials_insert.new_materials(materials) #IDs are attaatched to materials

    #Add known materials to material array
    for material in vendor_form.get('materials') or []:
        if(material.get("material_id") == '' or not material.get("material_id")): #ignore unassigned materials
            continue
        materials.append(Material.map_from_form(material))

    vendor.attatch_materials(materials)

    return vendor_insert.new_vendor(vendor)


@workflow.route('/vendor/update', methods = ['POST'])
@authorize()
def update_vendor():

    vendor_form = json.loads(request.form['payload'])

    vendor = Vendor.map_from_form(vendor_form)

    #Insert New Materials into database
    materials = []
    for material in vendor_form.get('new_materials') or []:
        materials.append(Material.map_from_form(material))
    materials = materials_insert.new_materials(materials) #IDs are attaatched to materials

    #Add known materials to material array
    for material in vendor_form.get('materials') or []:
        if(material.get("material_id") == '' or not material.get("material_id")): #ignore unassigned materials
            continue
        materials.append(Material.map_from_form(material))

    vendor.attatch_materials(materials)

    return vendor_update.update_vendor_with_image(vendor) if vendor.image.data else vendor_update.update_vendor(vendor)

    

@workflow.route('/vendor/listing', methods = ['POST'])
@authorize()
def vendor_listing():

    vendors = vendor_select.vendor_listing()

    serialized_vendors = utilities.serialize_array(vendors)

    return response.success(serialized_vendors)


@workflow.route('/vendor/basics/<vendor_id>', methods = ['POST'])
@authorize()
def vendor_basics(vendor_id, api_response = True):

    vendor = vendor_select.vendor(vendor_id)
    vendor.attatch_materials(vendor_material(vendor_id, api_response = False))

    return response.success(vendor.serialize()) if api_response else vendor
    

@workflow.route('/vendor/details/<vendor_id>', methods = ['POST'])
@authorize()
def vendor_details(vendor_id):

    vendor = vendor_basics(vendor_id, api_response = False)
    vendor.attatch_transactions(transaction_select.by_vendor(vendor.vendor_id))
    vendor.attatch_tickets(tickets_select.tickets_for_vendor(vendor.vendor_id))

    return response.success(vendor.serialize())


@workflow.route('/vendor/materials/<vendor_id>', methods = ['POST'])
@authorize()
def vendor_material(vendor_id, api_response = True):

    materials = materials_select.vendor_materials(vendor_id)

    return response.success(utilities.serialize_array(materials)) if api_response else materials