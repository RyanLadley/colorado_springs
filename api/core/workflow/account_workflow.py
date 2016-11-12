from api.core.workflow import workflow
from flask import request

import api.DAL.data_context.accounts.accounts_select as accounts_select

from api.core.buisness_objects.account import Account

import api.core.response as response
import api.core.utilities as utilities

import json

@workflow.route('/accounts/overview', methods = ['POST'])
def get_accounts_overview():

    accounts = accounts_select.accounts_overview()

    serialized_accounts = utilities.serialize_array(accounts)

    return response.success(serialized_accounts)


@workflow.route('/accounts/numbers', methods = ['POST'])
def get_account_numbers():

    accounts = accounts_select.account_numbers()

    serialized_accounts = utilities.serialize_array(accounts)

    return response.success(serialized_accounts)

@workflow.route('/accounts/details/<account_id>', methods = ['POST'])
def get_account_details(account_id):

    account = accounts_select.account_details(account_id)

    return response.success(account.serialize())