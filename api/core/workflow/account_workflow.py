from api.core.workflow import workflow
from flask import request

import api.DAL.data_context.accounts.accounts_select as accounts_select
import api.DAL.data_context.accounts.accounts_insert as accounts_insert
import api.DAL.data_context.accounts.accounts_update as accounts_update

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
    """This funtion returns a liist of all accounts, there subaccounts, and their shredouts
    along with their budget, expense, transfer, and remining budget amounts.
    This functiom is called on the "Overview" page of the font end and is the 
    information provided is equivalent to the summary page of the excell document 
    """

    accounts = accounts_select.accounts_overview()

    serialized_accounts = utilities.serialize_array(accounts)

    return response.success(serialized_accounts)


@workflow.route('/accounts/budget', methods = ['POST'])
@authorize()
def get_accounts_budget():
    """This funtion returns a liist of all accounts with there annual budget.
    This is used in the admin screen to facilitate budget updates 
    """

    accounts = accounts_select.accounts_budget()

    serialized_accounts = utilities.serialize_array(accounts)

    return response.success(serialized_accounts)


@workflow.route('/accounts/update/budget', methods = ['POST'])
@authorize()
def update_accounts_budget():
    """Update all account budgets
    """

    accounts_form = json.loads(request.form['payload'])

    accounts = []

    #This does not distinguish accounts and there subaccounts. 
    for account in accounts_form:
        accounts.append(Account.map_from_form(account))

        for sub_account in account.get('sub_accounts'):
            accounts.append(Account.map_from_form(sub_account))

            for shred_out in sub_account.get('sub_accounts'):
                accounts.append(Account.map_from_form(shred_out))

    return accounts_update.accounts_budget(accounts)


@workflow.route('/accounts/numbers', methods = ['POST'])
@authorize()
def get_account_numbers():
    """This function returns the all account numbers, with there sub, and their shredo outs.
    This includes only the numbers and their id's
    TODO: This appears to be redundent with the dropdown account call. Verify if it is and remove.
    """

    accounts = accounts_select.account_numbers()

    serialized_accounts = utilities.serialize_array(accounts)

    return response.success(serialized_accounts)


@workflow.route('/accounts/details/<account_id>', methods = ['POST'])
@authorize()
def get_account_details(account_id):
    """This function gets all the details for the the provided account id
    This includes all budget informatio included on the overview, as well as 
    transactions assigned to this account seperated out by their "date paid" month
    """

    account = accounts_select.account_details(account_id)

    return response.success(account.serialize())

@workflow.route('/accounts/transfer', methods = ['POST'])
@authorize()
def transfer():
    """This function creates a monetary transfer between two acounts.
    The informatio created from this is displayed on the overview page 
    as "misc trans"
    """

    transfer_form = json.loads(request.form['payload'])
    transfer_form = sanitize.form_keys(transfer_form)

    transfer = AccountTransfer.map_from_form(transfer_form)

    return accounts_insert.transfer(transfer)


@workflow.route('/accounts/transfers/<account_id>', methods = ['POST'])
@authorize()
def get_transfers(account_id):
    """This Function gets all transfers that effect the provided account and returns them
    """
    account = accounts_select.account_name(account_id)
    transfers = accounts_select.transfers(account)

    account.attach_transfers(transfers) #This changes the amount columns to relect how it effects the account

    serialized_transfers = utilities.serialize_array(account.transfers)

    return response.success(serialized_transfers)