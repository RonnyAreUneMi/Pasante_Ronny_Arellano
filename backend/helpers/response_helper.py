class ResponseHelper:
    def __init__(self):
        self.response_data = {
            'is_success': False,
            'message': '',
            'data': None,
            'form': {}
        }
    
    def set_success(self, success):
        self.response_data['is_success'] = success
    
    def set_message(self, message):
        self.response_data['message'] = message
    
    def set_data(self, data):
        self.response_data['data'] = data
    
    def set_form_errors(self, form_name, errors):
        self.response_data['form'][form_name] = {'errors': errors}
    
    def get_response(self):
        return self.response_data