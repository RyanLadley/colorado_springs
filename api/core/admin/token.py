import random
import string

class Token:

    @staticmethod
    def map_from_form(form):

        token = Token()

        token.user_id = form.get('user_id')

        token.token_value = form.get('token_value')

        return token

    def update(self):
        self.token_value = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(32))

    def serialize(self):

        return {key:str(value) for key,value in self.__dict__.items()}