import bittensor
from .utils import dumpData
from crontab import CronTab


def start():
    print("Starting cron job.")
    cron = CronTab()
    job = cron.new(command="echo $(date +%s) >>cron.logs")
    job.minute.every(1)
    tab = CronTab(tabfile="metagraph.cron")
    for _ in tab.run_scheduler():
        fetchMetagraph()


def stop():
    print("Stopping cron job.")
    # TODO: add code to remove cron job.


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
        dumpData(f"metagraph-data-{netUID}.json", metagraphData)
