from wandb import login, Api
from datetime import datetime, timedelta

login()
WandbApi = Api()
ProjectName = "pretraining-subnet"
EntityName = "opentensor-dev"
Now = datetime.now()


def fetchRuns() -> WandbApi.runs:
    runs = WandbApi.runs(
        f"{EntityName}/{ProjectName}",
        filters={
            "display_name": {
                "$regex": "^validator.*"  # Ref: https://stackoverflow.com/a/3483399
            },
            "created_at": {
                "$gte": (Now - timedelta(days=3)).strftime(
                    "%Y-%m-%dT%H:%M:%S"
                )  # fetch data for previous 3 days
            },
        },
    )
    return runs
