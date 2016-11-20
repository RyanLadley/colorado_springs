class CityAccount:

    @staticmethod
    def map_from_form(form):
        city_account = CityAccount()

        city_account.city_account_id = form.get('city_account_id')
        city_account.account_no = form.get('account_no')
        city_account.title = form.get('title')
        city_account.description = form.get('description')

        return city_account


    def serialize(self):
        serial = {key:str(value) for key,value in self.__dict__.items()}

        return serial