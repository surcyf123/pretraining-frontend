import boto3
import os

s3_client = boto3.client("s3")

# Ref: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-uploading-files.html
def upload(path):
    s3_client.upload_file(
        Filename=path,
        Bucket=os.environ.get("STORAGE_S359BCE836_BUCKETNAME"),
        Key="public/multi.json", # Ref: https://docs.amplify.aws/javascript/build-a-backend/storage/configure-access/
        # Ref: https://docs.amplify.aws/javascript/build-a-backend/storage/download/#frequently-asked-questions
        # Ref: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
        # using the no-cache directive indicates that response can be cached but before reusing it, validate it from origin server
        ExtraArgs={"Metadata": {"Cache-Control": "no-cache"}}
    )
