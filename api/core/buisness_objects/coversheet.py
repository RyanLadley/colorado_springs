class Coversheet:

    def __init__(self, vendor, description, transactions, invoice_no = None):
        self.vendor = vendor
        self.description = description
        self.transactions = transactions
        self.invoice_no = invoice_no

    def serialize(self):

        serial = {key:str(value) for key,value in self.__dict__.items()}

        serial['vendor'] = self.vendor.serialize()
        serial['transactions'] = self._serialize_transactions

        return serial

    def _serialize_invoice_accounts(self):
        
        serialized_transactions = []
        for transaction in self.transactions:
            sserialized_transactions.append(transaction.serialize())

        return serialized_invoice_accounts