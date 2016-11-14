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


    def serialize(self):
        serial = {key:str(value) for key,value in self.__dict__.items()}

        serial['image'] = self.image.serialize()

        if 'transactions' in serial:
            serial['transactions'] = self._serialize_transactions()

        return serial

    def _serialize_transactions(self):
        
        serialized_transactions = []

        for transaction in self.transactions:
            serialized_transactions.append(transaction.serialize())

        return serialized_transactions