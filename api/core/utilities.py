def serialize_array(array):

    serialized_array = []
    for item in array:
        serialized_array.append(item.serialize())

    return serialized_array