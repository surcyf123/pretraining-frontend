from wandb import login, Api

login()
WandbApi = Api()
ProjectName = "pretraining-subnet"
EntityName = "opentensor-dev"


def fetchValidatorRuns() -> WandbApi.runs:
    runs = WandbApi.runs(
        f"{EntityName}/{ProjectName}",
        filters={
            "display_name": {
                "$regex": "^validator.*"  # Ref: https://stackoverflow.com/a/3483399
            }
        },
    )
    return runs
