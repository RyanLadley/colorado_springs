
class Transaction:

    @staticmethod
    def map_from_form(form):
        transaction = Transaction()

        transaction.transaction_id = form.get('transaction_id')
        transaction.account_id = form.get('account_id')
        transaction.account_no = form.get('account_no')
        transaction.sub_no = form.get('sub_no')
        transaction.shred_no = form.get('shred_no')
        transaction.vendor_id = form.get('vendor_id')
        transaction.vendor_name = form.get('vendor_name')
        transaction.invoice_date = form.get('invoice_date')
        transaction.date_paid = form.get('date_paid')
        transaction.invoice_no = form.get('invoice_no')
        transaction.description = form.get('description')
        transaction.expense = form.get('expense')
        transaction.transaction_type_id = form.get('transaction_type_id')
        transaction.transaction_type = form.get('transaction_type')

        return transaction

    def attatch_city_account_assignments(self, assignments):

        self.city_account_assignments = assignments


    def serialize(self):

        serial = {key:str(value) for key,value in self.__dict__.items()}

        if 'city_account_assignments' in serial:
            serial['city_account_assignments'] = self._serialize_city_account_assignments()

        return serial

    def _serialize_city_account_assignments(self):
        
        serialized_city_account_assignments = []

        for assignment in self.city_account_assignments:
            serialized_city_account_assignments.append(assignment.serialize())

        return serialized_city_account_assignments