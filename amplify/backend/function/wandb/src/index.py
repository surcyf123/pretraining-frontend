import json
from utils.upload import upload
from utils.script import init_wandb, calculate_best_average_loss

def handler(event, context):
    run_data = init_wandb()
    history_run_data = run_data.get("history",{})
    recent_run_data = run_data.get("recent",{})
    history = calculate_best_average_loss(history_run_data)
    recent = calculate_best_average_loss(recent_run_data)
    upload(recent, filename = "recent.json")
    upload(history, filename = "history.json")
    
    return {
        "statusCode": 200,
        "body": json.dumps("Multi.json file updated successfully."),
    }
