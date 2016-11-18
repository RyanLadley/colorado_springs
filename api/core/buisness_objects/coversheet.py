class Coversheet:

    def __init__(self, invoice_no, vendor, description, invoice_accounts):
        self.invoice_no = invoice_no
        self.vendor = vendor
        self.description = description
        self.invoice_accounts = invoice_accounts

    def serialize(self):

        serial = {key:str(value) for key,value in self.__dict__.items()}

        serial['vendor'] = self.vendor.serialize()
        serial['invoice_accounts'] = self._serialize_invoice_accounts

        return serial

    def _serialize_invoice_accounts(self):
        
        serialized_invoice_accounts = []
        for accounts in self.invoice_accounts:
            sserialized_invoice_accounts.append(accounts.serialize())

        return serialized_invoice_accounts