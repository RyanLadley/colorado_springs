class Material:

    @staticmethod
    def map_from_form(form):
        material = Material()
        
        material.vendor_materials_id = form.get('vendor_materials_id')
        material.material_id = int(form['material_id']) if form.get('material_id') else None
        material.name = form.get('name')
        material.unit = form.get('unit')
        material.cost = form.get('cost')

        return material


    def serialize(self):
        serial = {key:str(value) for key,value in self.__dict__.items()}

        return serial