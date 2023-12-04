import json
import os
from utils.upload import upload
from utils.script import init_wandb, calculate_best_average_loss

def handler(event, context):
    all_run_data = init_wandb()
    multi_json_data = calculate_best_average_loss(all_run_data)
    upload(multi_json_data)
    
    return {
        "statusCode": 200,
        "body": json.dumps("Multi.json file updated successfully."),
    }
