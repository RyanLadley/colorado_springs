from api.core.workflow import workflow
from flask import request

import api.core.response as response
import api.core.sanitize as sanitize
import api.core.utilities as utilities

import api.DAL.data_context.accounts.accounts_select as accounts_select

import api.DAL.data_context.transactions.transaction_select as transaction_select
import api.DAL.data_context.transactions.transaction_insert as transaction_insert
import api.DAL.data_context.transactions.transaction_update as transaction_update

import api.DAL.data_context.city_accounts.city_accounts_select as city_accounts_select


from api.core.buisness_objects.transaction import Transaction
from api.core.buisness_objects.city_account_assignment import CityAccountAssignment

from api.core.admin.authorize import authorize

import json

@workflow.route('/transaction/new', methods = ['POST'])
@authorize()
def new_transaction():
    transaction_form = json.loads(request.form['payload'])
    transaction_form = sanitize.form_keys(transaction_form)

    transaction = Transaction.map_from_form(transaction_form)

    assignments = []

    for assignment in transaction_form.get('city_accounts'):
        if(assignment.get("city_account_id") == '' or not assignment.get("city_account_id")): #ignore unassigned city accounts
            continue
        assignments.append(CityAccountAssignment.map_from_form(assignment))

    transaction.attatch_city_account_assignments(assignments)

    return transaction_insert.new_transaction(transaction)


@workflow.route('/transaction/update', methods = ['POST'])
@authorize()
def update_transaction():

    transaction_form = json.loads(request.form['payload'])
    transaction_form = sanitize.form_keys(transaction_form)

    print(transaction_form)
    transaction = Transaction.map_from_form(transaction_form)

    assignments = []

    for assignment in transaction_form.get('city_accounts'):
        if(assignment.get("city_account_id") == '' or not assignment.get("city_account_id")): #ignore unassigned city accounts
            continue
        assignments.append(CityAccountAssignment.map_from_form(assignment))

    transaction.attatch_city_account_assignments(assignments)

    return transaction_update.update_transaction(transaction)


@workflow.route('/transaction/pending/update', methods = ['POST'])
@authorize()
def update_pending_transaction():

    transaction_form = json.loads(request.form['payload'])
    transaction_form = sanitize.form_keys(transaction_form)

    transaction = Transaction.map_from_form(transaction_form)

    return transaction_update.update_pending_transaction(transaction)



@workflow.route('/transaction/account/<account_id>', methods = ['POST'])
@authorize()
def get_account_transaction_by_month(account_id):

    account = accounts_select.account_name(account_id)
    
    transactions = transaction_select.from_account_by_month(account)

    account.attach_monthly_summary(transactions)

    return response.success(account.serialize())

@workflow.route('/transaction/pending/vendor/<vendor_id>', methods = ['POST'])
@authorize()
def get_pending_transaction_by_vendor(vendor_id):

    transactions = transaction_select.pending_by_vendor(vendor_id)

    return response.success(utilities.serialize_array(transactions))


@workflow.route('/transaction/invoice/search', methods = ['POST'])
@authorize()
def search_transaction_by_invoice():

    search_criteria = json.loads(request.form['payload'])

    vendor_id = search_criteria.get('vendorId')
    invoice_no = search_criteria.get('invoiceNo')

    print(vendor_id)

    transactions = transaction_select.search_by_invoice(vendor_id, invoice_no)

    return response.success(utilities.serialize_array(transactions))


@workflow.route('/transaction/city-account-assignments/<transaction_id>', methods = ['POST'])
@authorize()
def get_city_account_assignments_for_transaction(transaction_id):

    assignments = city_accounts_select.city_account_assignments_for_transaction(transaction_id)
    serialized_assignments =  utilities.serialize_array(assignments)

    return response.success(serialized_assignments)
