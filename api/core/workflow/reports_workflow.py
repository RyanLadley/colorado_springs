from api.core.workflow import workflow
from flask import request

import api.core.response as response
import api.core.sanitize as sanitize
import api.core.utilities as utilities

import api.DAL.data_context.reports.reports_select as reports_select


from api.core.buisness_objects.ticket import Ticket
from api.core.buisness_objects.transaction import Transaction
from api.core.buisness_objects.city_account_assignment import CityAccountAssignment

from api.core.admin.authorize import authorize

import json

@workflow.route('/reports/expense', methods = ['POST'])
@authorize()
def expense_report():
    """
    """
    
    filters = json.loads(request.form['payload'])

    accounts = reports_select.expense(filters.get('start_date'), filters.get('end_date'), filters.get('account_id'))

    total = 0
    for account in accounts:
        total += account.expendetures

    return response.success({'accounts': utilities.serialize_array(accounts), 'total': str(total)})


@workflow.route('/reports/tickets', methods = ['POST'])
@authorize()
def pending_report():
    """
    """
    
    filters = json.loads(request.form['payload'])

    result = reports_select.tickets(filters.get('start_date'), filters.get('end_date'), filters.get('vendor_id'))

    report = [
        {'key': 'Pending', 'values' : []},
        {'key': 'Expensed', 'values' : []}]

    for row in result:
        report[0]['values'].append({'project_no': row["project_no"], 'project_description': row["project_description"], 'amount': float(row["pending"])})
        report[1]['values'].append({'project_no': row["project_no"], 'project_description': row["project_description"], 'amount': float(row["expensed"])})

    return response.success(report)