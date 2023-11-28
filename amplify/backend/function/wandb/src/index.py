import json
import os
from utils.upload import upload
from utils.script import init_wandb, create_multi_JSON

def handler(event, context):
    init_wandb()
    output_path=create_multi_JSON()
    upload(output_path)
    
    return {
        "statusCode": 200,
        "body": json.dumps("Multi.json file updated successfully."),
    }
