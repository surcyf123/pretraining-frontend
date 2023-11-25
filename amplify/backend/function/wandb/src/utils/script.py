import wandb
import datetime

wandb.login()
api = wandb.Api()

project_name = "pretraining-subnet"
entity_name = "opentensor-dev"

runs = api.runs(f"{entity_name}/{project_name}")
now = datetime.datetime.now()

all_run_data = {}


def init_wandb():
  print("runs", runs)