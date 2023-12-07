import wandb
import datetime
import json
import pandas as pd
import math

wandb.login()
api = wandb.Api()

project_name = "pretraining-subnet"
entity_name = "opentensor-dev"
now = datetime.datetime.now()

# Ref: https://docs.wandb.ai/ref/python/public-api/api#examples-2
runs = api.runs(f"{entity_name}/{project_name}",
  filters={
    "created_at":{
    "$gte":(now  - datetime.timedelta(days=7)).strftime("%Y-%m-%dT%H:%M:%S")
  },
  # TODO: add  name filter
  })

def replace_inf_nan(obj):
    if isinstance(obj, list):
        return [replace_inf_nan(item) for item in obj]
    elif isinstance(obj, dict):
        return {key: replace_inf_nan(value) for key, value in obj.items()}
    # in python 'inf' (positive infinity) is instance of float. Ref: https://www.geeksforgeeks.org/python-infinity/
    # obj == float('inf') checks if obj is positive infinity.
    elif isinstance(obj, float) and (math.isinf(obj) or math.isnan(obj)):
        return None
    else:
        return obj

def calculate_best_average_loss(data):
    if(isinstance(data, dict)):
        for items in data.values():
            for item in items:
                if(isinstance(item, dict)):
                    uids = item.get("uids", [])
                    uid_data = item.get("uid_data", {})
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
                            item["best_average_loss"] = best_average_loss
    return data  

def calculate_time_diff(run):
  try:
    created_at = datetime.datetime.strptime(run.created_at, "%Y-%m-%dT%H:%M:%S")
  except ValueError:
    # Handle possible different time formats
    created_at = datetime.datetime.strptime(run.created_at, "%Y-%m-%dT%H:%M:%S.%fZ")
    # Calculate the time difference in days
  time_diff = now - created_at
  return time_diff.days

def init_wandb():
  all_run_data = {}
  recent_run_data={}

  for run in runs:
      # Check if "validator" is in the run name
      if "validator" in run.name:
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

              # Replace NaN value and infinity values with null
              converted_data = replace_inf_nan(converted_data)
              all_run_data[run.name] = converted_data

              if calculate_time_diff(run) < 3:
                  recent_run_data[run.name] = converted_data
  return {
      "recent": recent_run_data,
      "history": all_run_data
  }
