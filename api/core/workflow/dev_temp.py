#DELETE THIS MODULE. FOR PROPTYPING ONLY

from api.core.workflow import workflow
from flask import request

import api.DAL.data_context.bug_db as bug_db

from api.core.admin.authorize import authorize

import api.core.response as response
import api.core.sanitize as sanitize
import api.core.utilities as utilities

import json

@workflow.route('/dev/new/bug', methods = ['POST'])
@authorize()
def create_new_bug():

     bug_form = json.loads(request.form['payload'])
     token_form = json.loads(request.form['token'])

     bug_db.new_bug(bug_form, token_form.get("user_id"))

     return response.success()


@workflow.route('/dev/bugs', methods = ['POST'])
@authorize()
def get_bugs():

     bug_form = bug_db.select_bugs()

     return response.success(bug_form)