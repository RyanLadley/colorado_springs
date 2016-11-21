class AccountTransfer:

    @staticmethod
    def map_from_form(form):
        transfer = AccountTransfer()

        transfer.from_account_id = form.get("from_account_id")
        transfer.from_account_no = form.get("from_account_no")
        transfer.from_sub_no = form.get("from_sub_no")
        transfer.from_shred_no = form.get("from_shred_no")
        transfer.to_account_id = form.get("to_account_id")
        transfer.to_account_no = form.get("to_account_no")
        transfer.to_sub_no = form.get("to_sub_no")
        transfer.to_shred_no = form.get("to_shred_no")
        transfer.amount = form.get("amount")
        transfer.description = form.get("description")
        transfer.transfer_date = form.get("transfer_date")

        return transfer

    def serialize(self):
        serial = {key:str(value) for key,value in self.__dict__.items()}

        return serial