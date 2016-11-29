import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import sys

import api.core.workflow.backup_workflow as backup_workflow

def send_backup_email():


    SUBJECT = "System Backup"

    msg = MIMEMultipart()
    msg['Subject'] = SUBJECT 
    msg['From'] = "cos.fido@gmail.com"
    msg['To'] = "ladley.ryan@gmail.com"

    part = MIMEBase('application', "octet-stream")
    file_name = backup_workflow.backup_accounts_breakdown(api_response = False)
    part.set_payload(open("api/exports/backups/{}".format(file_name), "rb").read())
    encoders.encode_base64(part)

    part.add_header('Content-Disposition', 'attachment; filename="attatch.xlsx"')

    msg.attach(part)

    message = msg.as_string()

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as s:
            s.ehlo()
            s.starttls()
            s.ehlo()
            s.login("cos.fido@gmail.com", r"super.secure")
            s.sendmail('cos.fido@gmail.com', 'ladley.ryan@gmail.com', message)
            s.close()
        print("Email sent!")
    except:
        print("Unable to send the email. Error: ", sys.exc_info()[0])
        raise