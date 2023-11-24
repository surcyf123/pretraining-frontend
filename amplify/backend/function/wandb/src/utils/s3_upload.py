import boto3
import os

s3_client = boto3.client('s3')

def upload(path):
    s3_client.upload_file(
    Filename=path,
    Bucket=os.environ.get("STORAGE_S3486D4C80_BUCKETNAME"),
    Key='wandb_data/multi.json'
)