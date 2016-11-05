

def Account:

	@staticmethod
	def map_from_form(form):
		account = Account()

		account.id = form.get('account_id')
		account.account_no = form.get('account_no')
		account.sub_no = form.get('sub_no')
		account.shred_no = form.get('shred_no')
		account.descritption = form.get('description')
		account.annual_budget = form.get('annual_budget')
		account.transfer = form.get('transfer')
		account.total_budger = form.get('total_budget')
		account.expedetures = form.get('expendetures')
		account.remaining = form.get('remaining')

	return account

	def atatch_sub_accounts(self, accounts)

		self.sub_accounts = accounts

	def serialize(self):
        serial = {key:str(value) for key,value in self.__dict__.items()}

        if 'sub_accounts' in serial:
        	serial['sub_accounts'] = _serialize_sub_accounts()

        return serial

        
        return serial

     def _serialize_sub_accounts(self):
        
        serialized_sub_accounts = []
        for sub_account in self.sub_accounts:
            serialized_sub_accounts.append(sub_account.serialize())

        return serialized_sub_accounts