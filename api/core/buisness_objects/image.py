
import re
import sys
from binascii import a2b_base64

class Image:

    @staticmethod
    def map_from_form(form):
        image = Image()

        image.parse_data_uri(form.get('image'))

        image.folder = form.get('image_folder') or '0' #from database or DAL function
        image.file_name = form.get('image_file_name') or 'default'#from database or DAL function
        
        #image.type is either populated here or in data parse
        image.type = form.get('image_file_type') or image.type or 'jpg'

        return image


    
    def parse_data_uri(self, data_uri):
        """Takes data uri (i.e data:image/jpeg;base64,R0lGODlhEAAQAMQA....)
        #And seperates it into it's file type and binary data """

        try:
            self.type, data_content = data_uri.split(',', 1)
            self.type = re.findall('data:image\/(\w+);base64', self.type)[0]

            self.data = a2b_base64(data_content)

        except:
            self.type = None
            self.data = None

    
    def url(self):
        """Returns the relative url with the inormation provided."""

        return "{folder}/{file_name}.{type}".format(
            folder = self.folder, file_name = self.file_name, type = self.type)


    
    def save_to_file_system(self, parent_url):
        """Saves the image to the file system by appending the internal relative url
        to the parent url provided"""
        try:
            file_url = parent_url + self.url()

            with open((file_url), "wb") as file:
                file.write(self.data)

        except:
            print(sys.exc_info()[0])


    
    def serialize(self):
        """This serialize is diffrent than other object serializations
        It only returns the url of the image"""

        return self.url()
