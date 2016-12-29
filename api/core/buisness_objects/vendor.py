from api.core.buisness_objects.image import Image

class Vendor:

    @staticmethod
    def map_from_form(form):
        vendor = Vendor()

        vendor.vendor_id = form.get('vendor_id')
        vendor.name = form.get('name')
        vendor.image = Image.map_from_form(form)
        vendor.contract_no = form.get('contract_no')
        vendor.contract_start = form.get('contract_start')
        vendor.contract_end = form.get('contract_end')
        vendor.point_of_contact = form.get('point_of_contact')
        vendor.phone_no = form.get('phone_no')
        vendor.address = form.get('address')
        vendor.city = form.get('city')
        vendor.state = form.get('state')
        vendor.zip = form.get('zip')
        vendor.email = form.get('email')
        vendor.website = form.get('website')

        return vendor


    def attatch_transactions(self, transactions):

        self.transactions = transactions


    def attatch_tickets(self, tickets):

        self.tickets =tickets


    def attatch_materials(self, materials):

        self.materials = materials


    def serialize(self):
        serial = {key:str(value) for key,value in self.__dict__.items()}

        serial['image'] = self.image.serialize()

        if 'transactions' in serial:
            serial['transactions'] = self._serialize_transactions()

        if 'tickets' in serial:
            serial['tickets'] = self._serialize_tickets()

        if 'materials' in serial:
            serial['materials'] = self._serialize_materials()

        return serial


    def _serialize_transactions(self):
        
        serialized_transactions = []

        for transaction in self.transactions:
            serialized_transactions.append(transaction.serialize())

        return serialized_transactions


    def _serialize_tickets(self):
        
        serialized_tickets = []

        for ticket in self.tickets:
            serialized_tickets.append(ticket.serialize())

        return serialized_tickets


    def _serialize_materials(self):
        
        serialized_materials = []

        for material in self.materials:
            serialized_materials.append(material.serialize())

        return serialized_materials