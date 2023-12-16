import json
from utils.metagraph import get_metagraph_data
from utils.upload import upload

def handler(event, context):
  metagraph_data=get_metagraph_data()
  upload(metagraph_data)

  
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps('Hello from your new Amplify Python lambda!')
  }