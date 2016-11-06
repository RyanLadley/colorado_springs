from api.core.workflow import workflow
from flask import request

import api.DAL.data_context.accounts.accounts_select as accounts_select

from api.core.buisness_objects.account import Account

import api.core.response as response

import json

@workflow.route('/accounts/overview', methods = ['POST'])
def get_accounts_overview():

    accounts = accounts_select.accounts_overview()

    serialized_accounts = serialize_array(accounts)

    print(serialized_accounts)
    return response.success(serialized_accounts)


def serialize_array(array):

    '''Serializes all objects within an array, and returns the value'''
    #TODO Consider moving this to a diffrent file

    serialized_array = []
    for item in array:
        serialized_array.append(item.serialize())

    return serialized_array