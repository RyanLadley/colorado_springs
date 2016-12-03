def serialize_array(array):
    """This function takes an array of buisness_obects 
    and returns a serialized version of them in an array
    """


    serialized_array = []
    for item in array:
        serialized_array.append(item.serialize())

    return serialized_array


def currency(number):
    return '${:,.2f}'.format(number)