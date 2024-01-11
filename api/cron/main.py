from subprocess import Popen
from os import getcwd, path
import bittensor
from .utils import storeData
import time


def start():
    print("Starting cron job.")
    cronjobFilepath = path.join(getcwd(), "cron", "metagraph.cron")
    try:
        proccess = Popen(["crontab", cronjobFilepath])
        proccess.wait()
        print("Cron job Started.")
    except:
        print("Cronfile is in invalid format.")


def stop():
    print("Stopping cron job.")
    proccess = Popen(["crontab", "-r"])
    proccess.wait()
    print("Cron job stopped.")


def fetchMetagraph():
    netUIDs = list(range(33))
    for netUID in netUIDs:
        metagraph = bittensor.metagraph(netUID, lite=False, network="finney", sync=True)
        metagraphData = {
            "metadata": metagraph.metadata(),
            "neurons": {
                "uid": metagraph.uids.tolist(),
                "stake": metagraph.S.tolist(),
                "rank": metagraph.R.tolist(),
                "incentive": metagraph.I.tolist(),
                "emission": metagraph.E.tolist(),
                "consensus": metagraph.C.tolist(),
                "trust": metagraph.T.tolist(),
                "validatorTrust": metagraph.Tv.tolist(),
                "dividends": metagraph.D.tolist(),
                "hotkey": metagraph.hotkeys,
                "coldkey": metagraph.coldkeys,
                "address": metagraph.addresses,
            },
            "weights": metagraph.W.tolist(),
            "bonds": metagraph.B.tolist(),
            "stake": metagraph.S.tolist(),
            "validatorTrust": metagraph.Tv.tolist(),
        }
        storeData(f"metagraphData-{netUID}.json", metagraphData)
