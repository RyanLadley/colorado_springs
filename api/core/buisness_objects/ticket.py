
class Ticket:

    @staticmethod
    def map_from_form(form):
        ticket = Ticket()

        ticket.ticket_id = form.get('ticket_id')
        ticket.vendor_id = form.get('vendor_id')
        ticket.pprta_id = form.get('pprta_id')
        ticket.date = form.get('date')
        ticket.ticket_no = form.get('ticket_no')
        ticket.material_id = form.get('material_id')
        ticket.quantity = form.get('quantity')
        ticket.cost = form.get('cost')
        ticket.district = form.get('district')

        return ticket