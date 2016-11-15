from api.core.workflow import workflow
from flask import request

import api.core.response as response
import api.core.sanitize as sanitize
import api.core.utilities as utilities

import api.DAL.data_context.accounts.accounts_select as accounts_select

import api.DAL.data_context.transactions.transaction_select as transaction_select
import api.DAL.data_context.transactions.transaction_insert as transaction_insert
import api.DAL.data_context.transactions.transaction_update as transaction_update


from api.core.buisness_objects.transaction import Transaction

import json

@workflow.route('/transaction/new', methods = ['POST'])
def new_transaction():

    transaction_form = json.loads(request.form['payload'])
    transaction_form = sanitize.form_keys(transaction_form)

    transaction = Transaction.map_from_form(transaction_form)

    return transaction_insert.new_transaction(transaction)


@workflow.route('/transaction/update', methods = ['POST'])
def update_transaction():

    transaction_form = json.loads(request.form['payload'])
    transaction_form = sanitize.form_keys(transaction_form)

    transaction = Transaction.map_from_form(transaction_form)

    return transaction_update.update_transaction(transaction)


@workflow.route('/transaction/pending/update', methods = ['POST'])
def update_pending_transaction():

    transaction_form = json.loads(request.form['payload'])
    transaction_form = sanitize.form_keys(transaction_form)

    transaction = Transaction.map_from_form(transaction_form)

    return transaction_update.update_pending_transaction(transaction)



@workflow.route('/transaction/account/<account_id>', methods = ['POST'])
def get_account_transaction_by_month(account_id):

    account = accounts_select.account_name(account_id)
    
    transactions = transaction_select.from_account_by_month(account)

    account.attach_monthly_summary(transactions)

    return response.success(account.serialize())

@workflow.route('/transaction/pending/vendor/<vendor_id>', methods = ['POST'])
def get_pending_transaction_by_vendor(vendor_id):

    transactions = transaction_select.pending_by_vendor(vendor_id)

    return response.success(utilities.serialize_array(transactions))


@workflow.route('/transaction/types', methods = ['POST'])
def get_transaction_types():

    return response.success(transaction_select.types())