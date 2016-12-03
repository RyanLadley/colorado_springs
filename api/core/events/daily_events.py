import datetime
from threading import Timer
import api.core.system_email as system_email


def start_schedule():
    now = datetime.datetime.today()
    execution_time = (now + datetime.timedelta(days=1)).replace(hour = 0, minute =0, second =0)
    time_offset=execution_time-now

    offset_in_secs=time_offset.seconds+1
  
    thread = Timer(offset_in_secs, daily_tasks)
    thread.start()

def daily_tasks():
    system_email.send_backup_email()
    start_schedule()

if __name__ == '__main__':
    start_schedule()
