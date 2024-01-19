import bittensor
from .utils import (
    dumpData,
    formatRuns,
    filterLatestRuns,
    calculateBestAverageLoss,
    fetchSubnetEmissions,
)
from crontab import CronTab
from os import path, getcwd
from wandb import login, Api
from datetime import datetime, timedelta


login()
WandbApi = Api()
ProjectName = "pretraining-subnet"
EntityName = "opentensor-dev"


def fetchDelegates():
    delegates = bittensor.subtensor().get_delegates()
    dumpData("delegates.json", delegates)


def fetchMetagraphs():
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
                "active": metagraph.active.tolist(),
                "updated": metagraph.last_update.tolist(),
            },
            "weights": metagraph.W.tolist(),
            "bonds": metagraph.B.tolist(),
            "stake": metagraph.S.tolist(),
            "validatorTrust": metagraph.Tv.tolist(),
        }
        if netUID == 0:
            metagraphData["subnetEmission"] = fetchSubnetEmissions()
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


def startFetchingValidatorRuns():
    print("Fetching validator data ...")
    tab = CronTab(
        tab=f"""*/10 * * * * echo "$(date +\%Y-\%m-\%d_\%H:\%M:\%S)" >> {path.join(getcwd(),"cron","cron.logs")}"""
    )
    fetchValidatorRuns()  # Fetch validator runs as soon as the cron job starts
    for _ in tab.run_scheduler():
        try:
            fetchMetagraph()
        except:
            pass


def startFetchingDelegates():
    print("Fetching delegates data ...")
    tab = CronTab(
        tab=f"""*/10 * * * * echo "$(date +\%Y-\%m-\%d_\%H:\%M:\%S)" >> {path.join(getcwd(),"cron","cron.logs")}"""
    )
    fetchDelegates()  # Fetch metagraphs as soon as the cron job starts
    for _ in tab.run_scheduler():
        try:
            fetchDelegates()
        except:
            pass


def startFetchingMetagraphs():
    print("Fetching metagraph data ...")
    tab = CronTab(
        tab=f"""*/10 * * * * echo "$(date +\%Y-\%m-\%d_\%H:\%M:\%S)" >> {path.join(getcwd(),"cron","cron.logs")}"""
    )
    fetchMetagraphs()  # Fetch metagraphs as soon as the cron job starts
    for _ in tab.run_scheduler():
        try:
            fetchMetagraphs()
        except:
            pass


def stop():
    print("Stopping cron job.")
    # TODO: add code to remove cron job.