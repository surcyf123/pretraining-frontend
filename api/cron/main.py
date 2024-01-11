from  subprocess import Popen
from os import getcwd, path

def start():
    print("Starting cron job.")
    cronjobFilepath=path.join(getcwd(),"cron","metagraph.cron")
    try:
        proccess = Popen(["crontab",cronjobFilepath])
        proccess.wait()
        print("Cron job Started.")
    except:
        print("Cronfile is in invalid format.")

def stop():
    print("Stopping cron job.")
    proccess = Popen(["crontab","-r"])
    proccess.wait()
    print("Cron job stopped.")
