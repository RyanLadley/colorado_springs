from api.core.workflow import workflow
from flask import request

import api.DAL.data_context.accounts.accounts_select as accounts_select
import api.DAL.data_context.accounts.accounts_insert as accounts_insert

from api.core.buisness_objects.account import Account
from api.core.buisness_objects.account_transfer import AccountTransfer

from api.core.admin.authorize import authorize

import api.core.response as response
import api.core.sanitize as sanitize
import api.core.utilities as utilities

import json


@workflow.route('/accounts/overview', methods = ['POST'])
@authorize()
def get_accounts_overview():

    accounts = accounts_select.accounts_overview()

    serialized_accounts = utilities.serialize_array(accounts)

    return response.success(serialized_accounts)


@workflow.route('/accounts/numbers', methods = ['POST'])
@authorize()
def get_account_numbers():

    accounts = accounts_select.account_numbers()

    serialized_accounts = utilities.serialize_array(accounts)

    return response.success(serialized_accounts)


@workflow.route('/accounts/details/<account_id>', methods = ['POST'])
@authorize()
def get_account_details(account_id):

    account = accounts_select.account_details(account_id)

    return response.success(account.serialize())

@workflow.route('/accounts/transfer', methods = ['POST'])
@authorize()
def transfer():

    transfer_form = json.loads(request.form['payload'])
    transfer_form = sanitize.form_keys(transfer_form)

    transfer = AccountTransfer.map_from_form(transfer_form)

    return accounts_insert.transfer(transfer)