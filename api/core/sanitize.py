import re
from datetime import datetime
def form_keys(form):

    #convert keys from camel case to snake case
    for key, value in form.items():
        form[re.sub('([A-Z]+)', r'_\1', key).lower()] = form.pop(key)

    return form

def date_for_storage(date):

    try:
        date_object = datetime.strptime(date, '%m/%d/%Y')

        return date_object.strftime('%Y-%m-%d')

    except:

        return date