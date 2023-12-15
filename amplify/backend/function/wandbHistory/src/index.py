import json
from utils.upload import upload
from utils.script import init_wandb, calculate_best_average_loss, filter_recent_data, smooth_data

def handler(event, context):
    all_run_data = init_wandb()
    output = calculate_best_average_loss(all_run_data)
    smoothed_data = smooth_data(output)
    recent_data = filter_recent_data(smoothed_data)
    upload(smoothed_data, filename = "history.json")
    upload(recent_data, filename="recent.json")

    return {
        "statusCode": 200,
        "body": json.dumps("Multi.json file updated successfully."),
    }
