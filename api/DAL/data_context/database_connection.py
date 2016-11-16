from flask import request

import api.core.response as response
import MySQLdb
import random
import string
import json
import sys

class DatabaseConnection:

    '''DatabaseConnection is a decerator class used to open and close connection to the database provided in the api level connection_string.json
    add the @DataConnection tag above any class that need direct access (through MySQLdb) 
    The wraped funtion must have default cursor variable in its definition i.e. def select_database(self, var, cursor = None)'''

    def __init__(self, function):
        self.function = function


    def __call__(self, *args, **kwargs):

        #If a cursor is provided, there is no need to reestablish a connection
        if(kwargs.get('cursor', True) == True):
            db = self._connect()
            connection_cursor = db.cursor(MySQLdb.cursors.DictCursor)
            try:
                query_result = self.function(cursor = connection_cursor, *args, **kwargs)
                connection_cursor.close()
                db.commit();

            except MySQLdb.Error as exception:
                db.rollback()

                message = exception.args[1]
                print(message)
                return response.error(message)
               
            finally: 
                db.close()

            return query_result

        else:
            return self.function(*args, **kwargs)
    


    def _connect(self):

        '''Esablished a connection to the database and retruns the object containing this connection'''

        connection_json = self._get_connection_string()
        return MySQLdb.connect(connection_json['host'], connection_json['user'], connection_json['password'], 
                               connection_json['database'], port = int(connection_json['port']))


    def _get_connection_string(self):

        '''Reads the api level connection_string.json and create a python json file from the result'''

        try:
            with open("api/connection_string.json", "r") as connection_file:
                connection_string = ''.join(connection_file.readlines())
                return  json.loads(connection_string)
        except:
            print("There was an error with the connection string")