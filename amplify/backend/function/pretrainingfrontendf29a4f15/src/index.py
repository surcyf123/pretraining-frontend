import json
from utils.script import fetch_wandb_data
import boto3
import os

s3_client = boto3.client('s3')
def handler(event, context):
  fetch_wandb_data()
  
  multi_json_file_path='/utils/multi.json'
  s3_client.upload_file(
    Filename=multi_json_file_path,
    Bucket=os.environ.get("STORAGE_S32500FDF3_BUCKETNAME"),
    Key='s3_folder/multi.json'
)
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps('Hello from your new Amplify Python lambda!')
  }