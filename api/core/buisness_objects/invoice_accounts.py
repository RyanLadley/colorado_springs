class InvoiceAccounts:

    @staticmethod
    def map_from_form(form):
        accounts = InvoiceAccounts()

        accounts.account_id = form.get('account_id')
        accounts.account_no = form.get('account_no')
        accounts.program = "Placeholder - In House"
        accounts.expense = float(form.get('expense') or 0)

        return accounts

    def serialize(self):
        serial = {key:str(value) for key,value in self.__dict__.items()}

        return serial