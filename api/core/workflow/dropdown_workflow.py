from api.core.workflow import workflow
from flask import request

import api.DAL.data_context.accounts.accounts_select as accounts_select
import api.DAL.data_context.transactions.transaction_select as transaction_select
import api.DAL.data_context.vendor.vendor_select as vendor_select

from api.core.admin.authorize import authorize

import api.core.response as response
import api.core.sanitize as sanitize
import api.core.utilities as utilities

import json



@workflow.route('/dropdown/accounts', methods = ['POST'])
@authorize()
def account_dropdown(api_response = True):

    accounts = accounts_select.account_numbers()

    serialized_accounts = utilities.serialize_array(accounts)

    return response.success(serialized_accounts)  if api_response else serialized_accounts


@workflow.route('/dropdown/transaction-types', methods = ['POST'])
@authorize()
def transaction_types_dropdown(api_response = True):

    return response.success(transaction_select.types()) if api_response else transaction_select.types()


@workflow.route('/dropdown/vendors', methods = ['POST'])
@authorize()
def vendor_dropdown(api_response = True):

    vendors = vendor_select.vendor_listing()

    serialized_vendors = utilities.serialize_array(vendors)

    return response.success(serialized_vendors) if api_response else serialized_vendors


@workflow.route('/dropdown/all', methods = ['POST'])
@authorize()
def all_dropdowns():

    dropdowns = {}

    dropdowns['vendors'] = vendor_dropdown(api_response = False)
    dropdowns['transaction_types'] = transaction_types_dropdown(api_response = False)
    dropdowns['accounts'] = account_dropdown(api_response = False)

    return response.success(dropdowns)