import wandb
import datetime
import json
import pandas as pd

wandb.login()
api = wandb.Api()

project_name = "pretraining-subnet"
entity_name = "opentensor-dev"
now = datetime.datetime.now()

# Ref: https://docs.wandb.ai/ref/python/public-api/api#examples-2
runs = api.runs(f"{entity_name}/{project_name}",
  filters={
    "created_at": {
        "$gte": (now  - datetime.timedelta(days=30)).strftime("%Y-%m-%dT%H:%M:%S") # fetch data for previous 30 days
    },
    "display_name": {
        "$regex":"^validator.*" # Ref: https://stackoverflow.com/a/3483399
    }
  })

def calculate_best_average_loss(data):
    output=[]
    if(isinstance(data, dict)):
        for key, items in data.items():
            for item in items:
                if(isinstance(item, dict)):
                    uids = item.get("uids", [])
                    uid_data = item.get("uid_data", {})
                    timestamp=item.get("timestamp",None)
                    if(isinstance(uids, list) and isinstance(uid_data, dict)):
                        average_losses = []
                        for uid in uids:
                            current_uid_data = uid_data.get(str(uid), None)
                            if (isinstance(current_uid_data, dict)):
                                average_loss = current_uid_data.get("average_loss", None)
                                if(isinstance(average_loss, float) or isinstance(average_loss, int)):
                                    average_losses.append(average_loss)
                        if(len(average_losses) > 0):
                            best_average_loss = min(average_losses)
                            output.append({
                                "best_average_loss": best_average_loss,
                                "timestamp": timestamp * 1000, # When data is used in UI, Javascript excepts time in milliseconds. Here timestamp is in seconds.   
                                "key":key
                            })
    return output  

def init_wandb():
  all_run_data = {}

  for run in runs:
    print(run.name)
    # Retrieve the run history
    run_data = run.history()
    # Extract the 'original_format_json' key
    if 'original_format_json' in run_data.columns:
        original_format_json_data = run_data['original_format_json']
        # Convert the Pandas Series to a list or dict
        if (isinstance(original_format_json_data, pd.Series)):
            converted_data = []
            target_list = original_format_json_data.to_list()
            for ele in target_list:
                if isinstance(ele, str):
                    converted_data.append(json.loads(ele))
                else:    
                    converted_data.append(ele)
        else:
            converted_data = original_format_json_data
        all_run_data[run.name] = converted_data          
  return all_run_data

def filter_recent_data(data):
    filtered_data = []
    if(isinstance(data,list)):
        # Ref: https://docs.python.org/3/library/functions.html#filter
        iterator = filter(lambda ele: (now - datetime.datetime.fromtimestamp((ele["timestamp"]/1000))).days<=3, data)
        filtered_data = list(iterator)
    return filtered_data
