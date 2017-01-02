from api.core.workflow import workflow
from flask import request

import api.core.response as response
import api.core.sanitize as sanitize
import api.core.utilities as utilities

import api.DAL.data_context.tickets.tickets_insert as tickets_insert
import api.DAL.data_context.tickets.tickets_select as tickets_select
import api.DAL.data_context.tickets.tickets_update as tickets_update



from api.core.buisness_objects.ticket import Ticket

from api.core.admin.authorize import authorize

import json

@workflow.route('/tickets/new/batch', methods = ['POST'])
@authorize()
def new_ticket_batch():
    """This function creates a new tickets in the database
    It reieves all information pertinent to the tickers creating in the request form.
    This is a batch ccreation, meaning an array of tickets are recieved with the request
    """
    
    tickets_form = json.loads(request.form['payload'])

    tickets = []
    for ticket in tickets_form:
        tickets.append(Ticket.map_from_form(ticket))

    return tickets_insert.new_ticket_batch(tickets)


@workflow.route('/tickets/update', methods = ['POST'])
@authorize()
def update_ticket():
    """T
    """
    
    ticket_form = json.loads(request.form['payload'])

    ticket = Ticket.map_from_form(ticket_form)

    return tickets_update.ticket(ticket)


@workflow.route('/tickets/delete/<ticket_id>', methods = ['POST'])
@authorize()
def delete_ticket(ticket_id):
    """This functoin deletes an existing ticket
    The id of the ticket to delete is passes via the uri
    """

    return tickets_update.delete_ticket(ticket_id)


@workflow.route('/tickets/pending/vendor/<vendor_id>/project/<project_id>', methods = ['POST'])
@authorize()
def get_pending_tickets(vendor_id, project_id):
    """This function retrieves all pending tickets for the provided vendor and pprta project
    """
    
    tickets = tickets_select.pending_tickets(vendor_id, project_id)

    return response.success(utilities.serialize_array(tickets))

@workflow.route('/tickets/search', methods = ['POST'])
@authorize()
def get_ticket_search():
    """This function retrieves all tickets maching the search criteria
    """

    search_form = json.loads(request.form['payload'])
    
    tickets = tickets_select.ticket_search(search_form.get('vendor_id'), search_form.get('project_id'), search_form.get('ticket_no'))

    return response.success(utilities.serialize_array(tickets))