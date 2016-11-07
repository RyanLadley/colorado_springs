#! env/bin/python3.4
from flask import Flask, send_file

application = Flask(__name__)

#-------------------------------------#
#--------------Routes-----------------#
#-------------------------------------#
from client import client_side
import client.routes

from api.core.workflow import workflow
import api.core.workflow.account_workflow
import api.core.workflow.vendor_workflow
import api.core.workflow.transaction_workflow

application.register_blueprint(workflow, url_prefix='/api')

application.register_blueprint(client_side)

@application.route('/image/vendors/<path:resource_path>')
def send_project_image(resource_path):
    
    if ".." not in resource_path: 
        return send_file('api/DAL/images/vendors/' +resource_path)
    return False

if __name__ == "__main__":
    application.run(debug = True)
