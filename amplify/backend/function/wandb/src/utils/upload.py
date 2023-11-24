import boto3
import os

s3_client = boto3.client("s3")

# Ref: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-uploading-files.html
def upload(path):
    s3_client.upload_file(
        Filename=path,
        Bucket=os.environ.get("STORAGE_S359BCE836_BUCKETNAME"),
        Key="wandb_data/multi.json",
    )
