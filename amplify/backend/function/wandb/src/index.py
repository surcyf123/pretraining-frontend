import json
import os
from utils.upload import upload

def handler(event, context):
    current_directory = os.path.dirname(__file__)
    path = os.path.join(current_directory, "multi.json")
    upload(path)
    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        "body": json.dumps("Hello from your new Amplify Python lambda!"),
    }
