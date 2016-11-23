from flask import send_file
from client import client_side

#path to client side site folder
client_url = "client/"


#Route For Client Side Resources (JS, CSS, Non-DB Images, etc)
@client_side.route('/res/<path:resource_path>')
def res(resource_path):
    if ".." not in resource_path: 
        return send_file(client_url +resource_path)
    return False

@client_side.route('/coversheet/single-invoice/<path:file_name>')
def single_invoice_coversheet(file_name):
    if ".." not in file_name: 
        return send_file("api/exports/coversheets/single_invoice/" +file_name)
    return False

@client_side.route('/coversheet/project/<path:file_name>')
def project_coversheet(file_name):
    if ".." not in file_name: 
        return send_file("api/exports/coversheets/project/" +file_name)
    return False

#Routes For Web Pages

#Main Agility Page
@client_side.route('/')
@client_side.route('/login')
@client_side.route('/overview')
@client_side.route('/overview/account/<account_number>')
@client_side.route('/entry')
@client_side.route('/vendors')
@client_side.route('/vendors/<vendor_id>')
@client_side.route('/profile/<user_id>')
@client_side.route('/administrator/<user_id>')
@client_side.route('/reports')
@client_side.route('/adjustments')
@client_side.route('/coversheet')
@client_side.route('/reports/monthly-expense')
@client_side.route('/reports/expense-breakdown')
@client_side.route('/reports/monthly-breakdown')
def initial_page(*args, **kwargs):
    return send_file(client_url +'site/index.html')