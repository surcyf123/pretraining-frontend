import json
from utils.upload import upload
from utils.script import init_wandb, calculate_best_average_loss

def handler(event, context):
    recent_run_data = init_wandb()
    recent = calculate_best_average_loss(recent_run_data)
    upload(recent, filename = "recent-complete.json")

    return {
        "statusCode": 200,
        "body": json.dumps("recent.json file updated successfully."),
    }
