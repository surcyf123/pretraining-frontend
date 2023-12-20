import boto3
import json
import os

s3_client = boto3.client("s3")

def upload(data):
    # Ref: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/client/put_object.html#
    s3_client.put_object(
        Bucket = os.environ.get("STORAGE_S359BCE836_BUCKETNAME"),
        Body = json.dumps(data, indent = 2), # Ref: https://github.com/boto/boto3/issues/477#issuecomment-268341653
        Key = "public/metagraph.json", # Ref: https://docs.amplify.aws/javascript/build-a-backend/storage/configure-access/
        # Ref: https://docs.amplify.aws/javascript/build-a-backend/storage/download/#frequently-asked-questions
        # Ref: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
        # using the no-cache directive indicates that response can be cached but before reusing it, validate it from origin server
        CacheControl = "no-cache",
    )
