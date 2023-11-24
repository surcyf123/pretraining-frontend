import json
import os
from utils.s3_upload import upload

def handler(event, context):
    path=os.path.join(os.getcwd(),"utils","multi.json")
    upload(path)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps('Hello from your new Amplify Python lambda!')
        }