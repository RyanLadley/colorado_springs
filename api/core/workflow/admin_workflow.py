from api.core.workflow import workflow
from flask import request

import api.DAL.data_context.admin.user_update as user_update
import api.DAL.data_context.admin.user_insert as user_insert
import api.DAL.data_context.admin.user_select as user_select

from api.core.admin.credentials import Credentials
from api.core.admin.token import Token
from api.core.admin.user import User

from api.core.admin.validate import InvalidCredential
import api.core.admin.validate as validate

from api.core.admin.authorize import authorize
import api.core.response as response
import api.core.sanitize as sanitize
import api.core.utilities as utilities

import json

@workflow.route('/admin/register', methods = ['POST'])
def register_user():

    '''Called when adding a new user to the database. Makes sure that all information 
    provided is valid(see individual validations for details) and hashes the password for storage'''

    credentials_form = json.loads(request.form['payload'])
    credentials_form = sanitize.form_keys(credentials_form)

    credentials = Credentials.map_from_form(credentials_form)

    try:
        validate.email(credentials.email)
        validate.name(credentials.first_name)
        validate.name(credentials.last_name)
        validate.password(credentials.password)
    
    except InvalidCredential as invalid:
        return response.error(invalid.args[0])

    credentials.hash_password()

    user_insert.new_user(credentials)
    
    return response.success()


@workflow.route('/admin/login', methods = ['POST'])
def login():

    '''Called when a user is loging in (shocker)
    Checks the provided email and password with the values stored in the database'''

    credentials_form = json.loads(request.form['payload'])
    credentials_form = sanitize.form_keys(credentials_form)

    provided_credentials = Credentials.map_from_form(credentials_form)
    stored_credentials = user_select.login_credentials(provided_credentials)

    try:
        validate.login(stored_credentials, provided_credentials)
    
    except InvalidCredential as invalid:
        return response.error(invalid.args[0])

    token = Token()
    token.user_id = stored_credentials.id
    token.update()

    user_update.token(token)
    
    return response.add_token(token = token)


@workflow.route('/admin/user/listing', methods = ['POST'])
@authorize()
def get_user_listing_with_permssions():
    """FOR ADMINISTRATORS ONLY. This function returns a listing of all users nad there associated permission levels
    """

    users = user_select.listing_with_permissions()
    serialized_users = utilities.serialize_array(users)

    return response.success(serialized_users)


@workflow.route('/admin/user/update/permissions', methods = ['POST'])
@authorize()
def update_users_permissions():
    """FOR ADMINISTRATORS ONLY. This function reads a request form for multiple user information
    Contained in this information sould be a permissions value and a user id.
    This info is then used pdated the permissions of all users included in the form
    """

    users_form = json.loads(request.form['payload'])
    
    users = []
    for user in users_form:
        users.append(User.map_from_form(user))

    return user_update.permissions(users)


@workflow.route('/user/update/contact', methods = ['POST'])
@authorize()
def update_user_contact():
    """This function is called by any user to update his/her contact information
    It recieve a request form with the users new information and updates the db with this info
    """
    user_form = json.loads(request.form['payload'])
    
    user = User.map_from_form(user_form)

    return user_update.contact_information(user)


@workflow.route('/user/update/password', methods = ['POST'])
@authorize()
def update_user_password():
    """This function is calledby any user to update their own password
    It recieves a request form containing a user id, their current password,
    and their new password. The current password is checked with what is stored.
    If this password is valid, the new password is hashed and is placed in the database 
    as the users password 
    """
    
    credentials_form = json.loads(request.form['payload'])
    new_password = credentials_form.get('new')

    provided_credentials = Credentials.map_from_form(credentials_form)
    stored_credentials = user_select.confirmation_credentials(provided_credentials)

    try:
        validate.confirmation_password(stored_credentials, provided_credentials)
        validate.password(new_password)
    
    except InvalidCredential as invalid:
        return response.error(invalid.args[0])

    provided_credentials.password = new_password
    provided_credentials.hash_password()
    
    return user_update.password(provided_credentials)


@workflow.route('/user/update/freq', methods = ['POST'])
@authorize()
def update_user_backup_frequency():
    """This function is called by any user who is eligable to recieve te backup email
    This function recieve a request form contianing a user id, and an integer representing the number of days 
    in between which they wish to recieve the update. This information is then sotred in the database
    """
    
    user_form = json.loads(request.form['payload'])
   
    user = User.map_from_form(user_form)

    return user_update.backup_frequency(user)


@workflow.route('/user/basics', methods = ['POST'])
@authorize()
def get_user():
    """This function uses the token provided with all post requests to 
    get the users first and last names, as well as there permission level
    """

    token_form = json.loads(request.form['token'])
    token_form = sanitize.form_keys(token_form)

    token = Token.map_from_form(token_form)
    user = user_select.user(token)

    return response.success(user.serialize())


@workflow.route('/user/details', methods = ['POST'])
@authorize()
def get_user_details():
    """This function uses the token provided with all post requests to 
    retrieve all information currently stored in thedatabase about a user.
    This is used in the profile settings.
    """
    
    token_form = json.loads(request.form['token'])
    token_form = sanitize.form_keys(token_form)


    token = Token.map_from_form(token_form)
    user = user_select.user_details(token)

    return response.success(user.serialize())
