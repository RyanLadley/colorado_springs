#! env/bin/python3.4
from flask import Flask, send_file

application = Flask(__name__)

#-------------------------------------#
#--------------Routes-----------------#
#-------------------------------------#
from client import client_side
import client.routes

from api.core.workflow import workflow
import api.core.workflow.admin_workflow
import api.core.workflow.account_workflow
import api.core.workflow.transaction_workflow
import api.core.workflow.vendor_workflow
import api.core.workflow.dropdown_workflow
import api.core.workflow.coversheet_workflow
import api.core.workflow.backup_workflow
import api.core.workflow.ticket_workflow
import api.core.workflow.materials_workflow
import api.core.workflow.reports_workflow
import api.core.workflow.dev_temp


application.register_blueprint(workflow, url_prefix='/api')

application.register_blueprint(client_side)

import api.core.events.daily_events as daily_events

@application.route('/image/vendors/<path:resource_path>')
def send_project_image(resource_path):
    
    if ".." not in resource_path: 
        return send_file('api/DAL/images/vendors/' +resource_path)
    return False


if __name__ == "__main__":
    #daily_events.start_schedule()
    application.run(debug = True)
