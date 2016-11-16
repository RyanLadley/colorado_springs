from werkzeug.security import generate_password_hash


class Credentials:

    @staticmethod
    def map_from_form(form):

        credentials = Credentials()

        credentials.id = form.get('id')
        credentials.email = form.get('email')
        credentials.first_name = form.get('first_name')
        credentials.last_name = form.get('last_name')
        credentials.password = form.get('password')
        credentials.permissions = form.get('permissions')

        return credentials

    def hash_password(self):
        self.password = generate_password_hash(self.password)

    def serialize(self):

        return self.__dict__