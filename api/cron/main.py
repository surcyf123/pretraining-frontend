import bittensor
from .utils import dumpData, formatRuns, filterLatestRuns, calculateBestAverageLoss
from crontab import CronTab
from os import path, getcwd
from wandb import login, Api
from datetime import datetime, timedelta


login()
WandbApi = Api()
ProjectName = "pretraining-subnet"
EntityName = "opentensor-dev"


def startFetchingValidator():
    print("Fetching validator data")
    tab = CronTab(
        tab=f"""* * * * * echo "$(date +\%Y-\%m-\%d_\%H:\%M:\%S)" >> {path.join(getcwd(),"cron","cron.logs")}"""
    )
    fetchValidatorRuns()  # Fetch validator runs as soon as the cron job starts
    for _ in tab.run_scheduler():
        try:
            fetchMetagraph()
        except:
            pass


def startFetchingMetagraph():
    print("Fetching metagraph data.")
    tab = CronTab(
        tab=f"""* * * * * echo "$(date +\%Y-\%m-\%d_\%H:\%M:\%S)" >> {path.join(getcwd(),"cron","cron.logs")}"""
    )
    fetchMetagraph()  # Fetch metagraphs as soon as the cron job starts
    for _ in tab.run_scheduler():
        try:
            fetchMetagraph()
        except:
            pass


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


def fetchValidatorRuns() -> dict:
    runs = WandbApi.runs(
        f"{EntityName}/{ProjectName}",
        filters={
            "created_at": {
                "$gte": (datetime.now() - timedelta(days=30)).strftime(
                    "%Y-%m-%dT%H:%M:%S"
                )  # fetch data for previous n days
            },
            "display_name": {"$regex": "^validator-(\d+)-(\d+)-(\d+)-(\d+)_.+$"},
        },
    )
    formattedRuns = formatRuns(runs)
    recentRuns = filterLatestRuns(formattedRuns)
    updatedRuns = calculateBestAverageLoss(recentRuns)
    dumpData("validator-runs.json", updatedRuns)
