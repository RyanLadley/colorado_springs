
class User:

    @staticmethod
    def map_from_form(form):
    
        user = User()

        user.user_id = form.get('user_id')

        user.email = form.get('email')
        user.first_name = form.get('first_name')
        user.last_name = form.get('last_name')
        user.permissions = form.get('permissions')
        user.backup_freq = form.get('backup_freq')

        return user

    def serialize(self):

        return {key:str(value) for key,value in self.__dict__.items()}