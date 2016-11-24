from api.core.workflow import workflow
from flask import request

import api.DAL.data_context.accounts.accounts_select as accounts_select

import api.core.builders.backup_builder as backup_builder

from api.core.admin.authorize import authorize

import api.core.response as response
import api.core.sanitize as sanitize
import api.core.utilities as utilities

import json

@workflow.route('/backup/accounts', methods = ['POST'])
@authorize()
def backup_accounts_breakdown():

    accounts = accounts_select.accounts_overview()

    #The database is called within this builder to get transactions for all acounts
    file_name = backup_builder.build_accounts_breakdown(accounts)
    return response.success(file_name)

