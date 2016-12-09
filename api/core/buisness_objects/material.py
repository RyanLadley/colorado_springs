class Material:

    @staticmethod
    def map_from_form(form):
        material = Material()

        material.material_id = form.get('material_id')
        material.name = form.get('name')
        material.unit = form.get('unit')
        material.cost = form.get('cost')

        return material


    def serialize(self):
        serial = {key:str(value) for key,value in self.__dict__.items()}

        return serial