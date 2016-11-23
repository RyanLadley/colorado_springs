class PPRTACodes:

    @staticmethod
    def map_from_form(form):
        codes = PPRTACodes()

        codes.pprta_account_code_id = form.get('pprta_account_code_id')
        codes.account_no = form.get('account_no')
        codes.fund_no = form.get('fund_no')
        codes.dept_no = form.get('dept_no')
        codes.project_no = form.get('project_no')
        codes.project_description = form.get('project_description')
        codes.account_prefix = form.get('account_prefix')

        return codes

    def serialize(self):
        serial = {key:str(value) for key,value in self.__dict__.items()}

        return serial