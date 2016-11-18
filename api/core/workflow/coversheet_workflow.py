from flask import send_file

from api.core.workflow import workflow
from flask import request

import api.core.response as response
import api.core.sanitize as sanitize
import api.core.utilities as utilities

import api.DAL.data_context.coversheets.coversheets_select as coversheet_select
import api.DAL.data_context.vendor.vendor_select as vendor_select

from api.core.buisness_objects.coversheet import Coversheet

import api.core.builders.coversheet_builder as coversheet_builder

from api.core.admin.authorize import authorize

import json

@workflow.route('/coversheet/single', methods = ['POST'])
@authorize()
def create_single_coversheet():

    coversheet_form = json.loads(request.form['payload'])
    coversheet_form = sanitize.form_keys(coversheet_form)

    invoice_accounts = coversheet_select.invoice_accounts(coversheet_form['transaction_ids'])
    vendor = coversheet_select.vendor(coversheet_form['vendor_id'])

    coversheet = Coversheet(coversheet_form.get('invoice_no'), vendor, coversheet_form.get('description') or "None Provided", invoice_accounts)

    file_name = coversheet_builder.build_single_invoice(coversheet)

    return response.success(file_name)
