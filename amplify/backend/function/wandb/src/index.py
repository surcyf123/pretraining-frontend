import json
import os
from utils.upload import upload
from utils.script import init_wandb, get_multi_json_data

def handler(event, context):
    init_wandb()
    multi_json_data = get_multi_json_data()
    upload(multi_json_data)
    
    return {
        "statusCode": 200,
        "body": json.dumps("Multi.json file updated successfully."),
    }
