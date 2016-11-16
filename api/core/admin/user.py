
class User:

    @staticmethod
    def map_from_form(form):

        user = User()

        user.id = form.get('user_id') or 0

        user.email = form.get('email')
        user.first_name = form.get('user_first_name')
        user.last_name = form.get('user_last_name')

        return user

    def serialize(self):

        return {key:str(value) for key,value in self.__dict__.items()}