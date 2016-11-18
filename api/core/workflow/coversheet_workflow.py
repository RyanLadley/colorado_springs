from api.core.workflow import workflow
from flask import request

import api.core.response as response
import api.core.sanitize as sanitize
import api.core.utilities as utilities

import api.DAL.data_context.transactions.transaction_select as transaction_select

from api.core.buisness_objects.transaction import Transaction

from api.core.admin.authorize import authorize

import json

'''@workflow.route('/coversheet/single', methods = ['POST'])
@authorize()
def create_single_coversheet():

    transaction_ids = json.loads(request.form['payload'])

    invoice = transaction_select.

    return transaction_insert.new_transaction(transaction)


@workflow.route('/transaction/account/<account_id>', methods = ['POST'])
@authorize()
def get_account_transaction_by_month(account_id):

    account = accounts_select.account_name(account_id)
    
    transactions = transaction_select.from_account_by_month(account)

    account.attach_monthly_summary(transactions)

    return response.success(account.serialize())'''