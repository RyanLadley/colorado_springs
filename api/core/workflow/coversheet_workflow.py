from flask import send_file

from api.core.workflow import workflow
from flask import request

import api.core.response as response
import api.core.sanitize as sanitize
import api.core.utilities as utilities


import api.DAL.data_context.accounts.accounts_select as accounts_select
import api.DAL.data_context.city_accounts.city_accounts_select as city_accounts_select
import api.DAL.data_context.transactions.transaction_select as transaction_select
import api.DAL.data_context.coversheets.coversheets_select as coversheets_select
import api.DAL.data_context.vendor.vendor_select as vendor_select

from api.core.buisness_objects.coversheet import Coversheet
from api.core.buisness_objects.transaction import Transaction

import api.core.builders.coversheet_builder as coversheet_builder

from api.core.admin.authorize import authorize

import json


@workflow.route('/coversheet/single', methods = ['POST'])
@authorize()
def create_single_coversheet():

    coversheet_form = json.loads(request.form['payload'])

    transactions = transaction_select.transaction_by_muliple_ids(coversheet_form['transaction_ids'])

    #TODO:Figure our module error so this can be place in the above slection
    for transaction in transactions:
        transaction.attatch_pprta_codes(accounts_select.pprta_codes(transaction.account_id))
    
    vendor = coversheets_select.vendor(coversheet_form['vendor_id'])

    coversheet = Coversheet(vendor, coversheet_form.get('description') or "None Provided", transactions, invoice_no = coversheet_form.get('invoice_no'))

    file_name = coversheet_builder.build_single_invoice(coversheet)

    return response.success(file_name)

@workflow.route('/coversheet/project', methods = ['POST'])
@authorize()
def create_project_coversheet():

    coversheet_form = json.loads(request.form['payload'])

    transactions = []
    for transaction in coversheet_form['transactions']:
        transactions.append(Transaction.map_from_form(transaction))

    for transaction in transactions:
        transaction.attatch_city_account_assignments(city_accounts_select.assignments_for_transaction(transaction.transaction_id))
        transaction.attatch_pprta_codes(accounts_select.pprta_codes(transaction.account_id))
    
    vendor = coversheets_select.vendor(coversheet_form['vendor_id'])

    coversheet = Coversheet(vendor, coversheet_form.get('description') or "None Provided", transactions)

    file_name = coversheet_builder.build_project_sheet(coversheet)

    return response.success(file_name)

