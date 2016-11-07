from api.core.workflow import workflow
from flask import request

import api.core.response as response
import api.core.sanitize as sanitize
import api.core.utilities as utilities

import api.DAL.data_context.transactions.transaction_select as transaction_select
import api.DAL.data_context.transactions.transaction_insert as transaction_insert


from api.core.buisness_objects.transaction import Transaction

import json

@workflow.route('/transaction/new', methods = ['POST'])
def new_transaction():

    transaction_form = json.loads(request.form['payload'])
    transaction_form = sanitize.form_keys(transaction_form)
    print(transaction_form)
    transaction = Transaction.map_from_form(transaction_form)

    return transaction_insert.new_transaction(transaction)

@workflow.route('/transaction/types', methods = ['POST'])
def get_transaction_types():

    return response.success(transaction_select.types())