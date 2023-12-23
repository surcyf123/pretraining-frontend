# [Bittensor Docker Image and ECR Push Instructions](https://docs.aws.amazon.com/lambda/latest/dg/python-image.html#python-image-instructions)

## How to build Docker image?

1. Navigate to the bittensor directory.
```shell
cd bittensor
```
2. Build the Docker image.
```shell
docker build --platform linux/x86_64 -t docker-image:bittensor .
```
3. Locally run a container.
```shell
docker run --platform linux/x86_64 -e AWS_ACCESS_KEY_ID="<AWS ACCESS KEYS>" -e AWS_SECRET_ACCESS_KEY="<AWS SECRET ACCESS KEY>" -e STORAGE_S359BCE836_BUCKETNAME="<Bucket Name>" -p 9000:8080 docker-image:bittensor
```
4. Test Running Container.
```shell
curl "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'
```


## How to push Docker image to ECR

1. Authenticate your docker cli with Amazon ECR.

```shell
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <your account id>.dkr.ecr.us-east-1.amazonaws.com
```
2. Create an ECR repositry.

```shell
aws ecr create-repository --repository-name <repositry name> --region us-east-1 --image-scanning-configuration scanOnPush=true --image-tag-mutability MUTABLE
```
3. [Build your docker image](#how-to-build-docker-image).

4. Tag your docker image.
```shell
docker tag <your image name>:<tag> <your account id>.dkr.ecr.us-east-1.amazonaws.com/<your image name>:latest
```
5. Run docker push.
```shell
docker push <Your account id>.dkr.ecr.us-east-1.amazonaws.com/<your image name>:latest

```
