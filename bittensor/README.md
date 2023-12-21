## [How to build Docker image](https://docs.aws.amazon.com/lambda/latest/dg/python-image.html#python-image-instructions)?

```shell

# 1. Navigate to the bittensor directory.
cd bittensor

# 2. Build the Docker image.
docker build --platform linux/x86_64 -t docker-image:bittensor .

# 3. Locally run a container.
docker run --platform linux/x86_64 -e AWS_ACCESS_KEY_ID="<AWS ACCESS KEYS>" -e AWS_SECRET_ACCESS_KEY="<AWS SECRET ACCESS KEY>" -e STORAGE_S359BCE836_BUCKETNAME="<Bucket Name>" -p 9000:8080 docker-image:bittensor

# 4. Test Running Container.
curl "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'
```