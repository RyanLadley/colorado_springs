from api.core.workflow import workflow
from flask import request

import api.DAL.data_context.accounts.accounts_select as accounts_select
import api.DAL.data_context.admin.user_select as user_select
import api.core.builders.backup_builder as backup_builder

from api.core.admin.authorize import authorize

import api.core.response as response
import api.core.sanitize as sanitize
import api.core.utilities as utilities

import json

@workflow.route('/backup/accounts', methods = ['POST'])
@authorize()
def backup_accounts_breakdown(api_response = True):
    """This function can be called by the front end or by the back
    This function gets the accout overview and pass this informaton into 
    the backup_builder to create the bakup excell spreadsheett. 
    """
    accounts = accounts_select.accounts_overview()

    #The database is called within this builder to get transactions for all acounts
    file_name = backup_builder.build_accounts_breakdown(accounts)
    return response.success(file_name) if api_response else file_name


def backup_recipients():
    """This function is not called by the front end, rather it is called by the 
    bak_up builder to retrieve all emails of those users who will be recieing thebackup email
    """

    recipients = user_select.backup_emails()

    return recipients
