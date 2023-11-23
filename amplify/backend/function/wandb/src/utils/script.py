import wandb

def initialize_wan_db():
    # Initialize the wandb API
    api = wandb.Api()

    # Define the project and entity
    project_name = "pretraining-subnet"
    entity_name = "opentensor-dev"

    # Retrieve all runs from the specified project
    runs = api.runs(f"{entity_name}/{project_name}")
    for run in runs:
        print(run)