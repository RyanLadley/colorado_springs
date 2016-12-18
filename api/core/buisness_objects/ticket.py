
class Ticket:

    @staticmethod
    def map_from_form(form):
        ticket = Ticket()

        ticket.ticket_id = form.get('ticket_id')
        ticket.vendor_id = form.get('vendor_id')
        ticket.vendor_name = form.get('vendor_name')
        ticket.pprta_id = form.get('pprta_id')
        ticket.pprta_no = form.get('project_no')
        ticket.pprta_description = form.get('project_description')
        ticket.date = form.get('date')
        ticket.ticket_no = form.get('ticket_no')
        ticket.material_id = form.get('material_id')
        ticket.material_name = form.get('material_name')
        ticket.quantity = form.get('quantity')
        ticket.cost = form.get('cost')
        ticket.district = form.get('district')
        ticket.transaction_id = form.get('transaction_id')
        ticket.invoice_no = form.get('invoice_no')

        return ticket


    def serialize(self):
        serial = {key:str(value) for key,value in self.__dict__.items()}

        return serial