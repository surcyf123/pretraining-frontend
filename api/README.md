## (Launching EC2 Instance)[https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-launch-instance-wizard.html]
# Specifications:
- Memory: 20GB
- Image: Amazon Linux
- Instanct type: t2.large

# Security Group Configuration
  Inbound rules:
  - ssh Rule
    - Type: SSH
    - Port: 22
    - Source: Custom
    - ip: My ip
  - TCP Rule
   - Type: Custom TCP
   - Port: 8000
   - Source: Custom
   - ip: 0.0.0.0/0

## Python and poetry setup
```shell
sudo yum update 
sudo yum install python3.11 -y
python3.11 -m ensurepip
pip3 install pipx
pipx ensurepath
pipx install poetry
```

## Verify installation
```shell
python3.11 --version
pip3 --version
pipx --version
poetry --version
```

## Copy Files from Local to aws server
1. Connect to EC2 Instance 
```shell
ssh -i "<path to EC2 private key>.pem" ec2-user@<EC2 Instance>
```
2. Remove everything in the home directory
```shell
 rm -rf ~/*
```
3. Copy files from local 
```shell
 scp -i <path to EC2 private key>.pem -r  ./pretraining-frontend/api/*   ec2-user@<Ec2 Instance>:/home/ec2-user
```

## Starting and running erver
```shell
cd ~/
poetry install
nohup poetry run serve &  # run poetry in deattached
```

## Enviroment variables configuration
- To add enviroment variables create a .env file at the root of python project

```
WANDB_API_KEY=<YOUR WANDB API KEY>
```

## Scheduling cron jobs
1. Connect to Ec2
2. Install cronie
```shell
sudo yum install cronie
```
3. Verify installation
```shell
crontab
```

3. Schedule cronjob
```shell
crontab <Path to your cron file> 
```