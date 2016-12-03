import re
from datetime import datetime

import json

camel_patern = re.compile(r'([A-Z])')

def form_keys(form):

    #convert keys from camel case to snake case
    for key, value in form.items(): 
        form[camel_to_snake(key)] = form.pop(key)
        #Test for arrays
        if isinstance(value, list):
            for f in value:
                #checks if the array contains a dict. If it does, sanitize
                if(isinstance(f, dict)):
                    form_keys(f)

    return form

def date_for_storage(date):
    """MSQL dates must be in the format y-m-d. This function asssures that the provided date is in that format
    """
    try:
        date_object = datetime.strptime(date, '%m/%d/%Y')

        return date_object.strftime('%Y-%m-%d')

    except:

        return date


def camel_to_snake(name):
    return camel_patern.sub(lambda x: '_' + x.group(1).lower(), name)