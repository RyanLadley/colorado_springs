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


from api.core.buisness_objects.ticket import Ticket
from api.core.buisness_objects.transaction import Transaction
from api.core.buisness_objects.city_account_assignment import CityAccountAssignment

from api.core.admin.authorize import authorize

import json

@workflow.route('/transaction/new', methods = ['POST'])
@authorize()
def new_transaction():
    """This function creates a new transaction in the database
    It reieves all information pertinent to transaction creating in the request form.
    """
    
    transaction_form = json.loads(request.form['payload'])

    transaction = Transaction.map_from_form(transaction_form)

    assignments = []
    for assignment in transaction_form.get('city_accounts') or []:
        if(assignment.get("city_account_id") == '' or not assignment.get("city_account_id")): #ignore unassigned city accounts
            continue
        assignments.append(CityAccountAssignment.map_from_form(assignment))
    transaction.attatch_city_account_assignments(assignments)

    tickets = []
    for ticket in transaction_form.get('tickets') or []:
        tickets.append(Ticket.map_from_form(ticket))
    transaction.attatch_tickets(tickets)

    return transaction_insert.new_transaction(transaction)


@workflow.route('/transaction/update', methods = ['POST'])
@authorize()
def update_transaction():
    """This functoin updates an existing transaction.
    The information recieved via the request form is identical to the information recied by the "new_transaction"
    with the exception that ann update also contains a trnasaction id
    """


    transaction_form = json.loads(request.form['payload'])

    transaction = Transaction.map_from_form(transaction_form)

    assignments = []

    for assignment in transaction_form.get('city_accounts'):
        if(assignment.get("city_account_id") == '' or not assignment.get("city_account_id")): #ignore unassigned city accounts
            continue
        assignments.append(CityAccountAssignment.map_from_form(assignment))

    transaction.attatch_city_account_assignments(assignments)

    return transaction_update.update_transaction(transaction)


@workflow.route('/transaction/delete/<transaction_id>', methods = ['POST'])
@authorize()
def delete_transaction(transaction_id):
    """This functoin deletes an existing transaction.
    The id of the transaction to delet is passes via the uri
    """

    return transaction_update.delete_transaction(transaction_id)


@workflow.route('/transaction/account/<account_id>', methods = ['POST'])
@authorize()
def get_account_transaction_by_month(account_id):
    """This funtion returns a listing of all transactions for the provided account_id
    sepeerated by it's date paid month. This call is not currenty used for the account details page,
    rather it is used to provide a clean way for a user to view transaction for adjustments
    """

    account = accounts_select.account_name(account_id)
    
    summary = {}
    summary["transactions"] = transaction_select.from_account_by_month(account)

    account.attach_monthly_summary(summary)

    return response.success(account.serialize())


@workflow.route('/transaction/details/<transaction_id>', methods = ['POST'])
@authorize()
def get_transaction_details(transaction_id):
    """This call gets all pertenatent information about a transaction
    This includes the city codes, pprta codes, transaction type, and
    all other basic information.Currently used in the transaction dialog
    """

    transaction = transaction_select.details(transaction_id)
    transaction.attatch_pprta_codes(accounts_select.pprta_codes(transaction.account_id))

    return response.success(transaction.serialize())


@workflow.route('/transaction/invoice/search', methods = ['POST'])
@authorize()
def search_transaction_by_invoice():
    """This funnction returns all transactio thae meetthe criteria
    provided by the request form. In the request form a vendor_id, invoic_no, 
    and pprta_account_code_id are provided. If any of these are "None", then they are disregarded 
    in the search.  
    """

    search_criteria = json.loads(request.form['payload'])

    vendor_id = search_criteria.get('vendor_id')
    invoice_no = search_criteria.get('invoice_no')
    pprta_account_code_id = search_criteria.get('pprta_account_code_id')

    transactions = transaction_select.search_by_invoice(vendor_id, invoice_no, pprta_account_code_id)

    return response.success(utilities.serialize_array(transactions))


@workflow.route('/transaction/city-account-assignments/<transaction_id>', methods = ['POST'])
@authorize()
def get_city_account_assignments_for_transaction(transaction_id):
    """This returns the city account assignemnts for the provided transaction_id
    This is currently only called on tehe transaction adjustment screen 
    """

    assignments = city_accounts_select.assignments_for_transaction(transaction_id)
    serialized_assignments =  utilities.serialize_array(assignments)

    return response.success(serialized_assignments)
