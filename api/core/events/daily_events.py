from datetime import datetime
from threading import Timer
import api.core.system_email as system_email


def start_schedule():
    x = datetime.today()
    y = x.replace(day=x.day, hour=11, minute=8, second=0, microsecond=0)
    delta_t=y-x

    secs=delta_t.seconds+1

    t = Timer(secs, daily_tasks)
    t.start()

def daily_tasks():
    system_email.send_backup_email()
    start_schedule()

