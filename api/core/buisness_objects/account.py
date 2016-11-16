import decimal

class Account:

    @staticmethod
    def map_from_form(form):
        account = Account()

        account.account_id = form.get('account_id')
        account.account_no = form.get('account_no')
        account.sub_no = form.get('sub_no')
        account.shred_no = form.get('shred_no')
        account.description = form.get('description')
        account.annual_budget = form.get('annual_budget')
        account.transfer = form.get('transfer')
        account.total_budget = (account.annual_budget + account.transfer) if account.annual_budget is not None and account.transfer is not None else None
        account.expendetures = form.get('expendetures')
        account.remaining = (decimal.Decimal(account.total_budget) - decimal.Decimal(account.expendetures)) if (account.total_budget is not None and 
                                                                                                            account.expendetures is not None) else None

        return account

    def attach_sub_accounts(self, accounts):

        self.sub_accounts = accounts

    def attach_monthly_summary(self, summary):

        self.monthly_summary = summary

    def serialize(self):
        serial = {key:str(value) for key,value in self.__dict__.items()}

        if 'sub_accounts' in serial:
            serial['sub_accounts'] = self._serialize_sub_accounts()

        if 'monthly_summary' in serial:
            serial['monthly_summary'] = self._serialize_monthly_summary()

        return serial

    def _serialize_sub_accounts(self):
        
        serialized_sub_accounts = []

        for sub_account in self.sub_accounts:
            serialized_sub_accounts.append(sub_account.serialize())

        return serialized_sub_accounts

    def _serialize_monthly_summary(self):
        
        serialized_summary = {}

        for month, transactions in self.monthly_summary.items():
            serialized_transactions = []
            for transaction in transactions:
                serialized_transactions.append(transaction.serialize())
            serialized_summary[month] = serialized_transactions

        return serialized_summary