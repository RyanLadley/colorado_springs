class CityAccountAssignment:

    @staticmethod
    def map_from_form(form):
        assignment = CityAccountAssignment()

        assignment.city_account_assignment_id = form.get('city_account_assignment_id')
        assignment.transaction_id = form.get('transaction_id')
        assignment.city_account_id = form.get('city_account_id')
        assignment.city_account_no = form.get('city_account_no')
        assignment.program = form.get('program')
        assignment.amount = form.get('amount')

        return assignment


    def serialize(self):
        serial = {key:str(value) for key,value in self.__dict__.items()}

        return serial