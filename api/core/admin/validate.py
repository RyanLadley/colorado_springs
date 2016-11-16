from werkzeug.security import check_password_hash
import re

def name(name):
    if ("\\" in name or " " in name 
            or len(name) < 1 or len(name) > 20):
        raise InvalidCredential("Invalid Name")


def email(email):
    #Check format and length of the email

    if not (re.match(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)", email) 
            and len(email) <= 254):
        raise InvalidCredential("Invalid Email")


def password(password):
    """ Check for invalid characters and proper length in password"""

    if ("\\" in password or " " in password 
            or len(password) < 6 
            or len(password) > 254):
        raise InvalidCredential("Invalid Password")


def login(stored, provided):
    if not (stored.email == provided.email and check_password_hash(stored.password, provided.password)):
        raise InvalidCredential("Incorect Email or Password")


def token(stored, provided):
    if not (stored.token_value == provided.token_value):
        raise InvalidCredential("Invalid User")


class InvalidCredential(Exception):
    pass