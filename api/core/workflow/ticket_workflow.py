from api.core.workflow import workflow
from flask import request

import api.core.response as response
import api.core.sanitize as sanitize
import api.core.utilities as utilities

import api.DAL.data_context.tickets.tickets_insert as tickets_insert


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