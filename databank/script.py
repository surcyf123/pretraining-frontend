import wandb
import datetime
import json
import os
import pandas as pd

# Initialize the wandb API
api = wandb.Api()

# Define the project and entity
project_name = "openpretraining"
entity_name = "opentensor-dev"

# Retrieve all runs from the specified project
runs = api.runs(f"{entity_name}/{project_name}")

# Get the current time
now = datetime.datetime.now()

# Initialize a dictionary to hold the original_format_json data for all runs
all_run_data = {}

for run in runs:
    # Parse the created_at time
    try:
        created_at = datetime.datetime.strptime(run.created_at, "%Y-%m-%dT%H:%M:%S")
    except ValueError:
        # Handle possible different time formats
        created_at = datetime.datetime.strptime(run.created_at, "%Y-%m-%dT%H:%M:%S.%fZ")

    # Calculate the time difference in days
    time_diff = now - created_at

    # Check if the run was started less than 3 days ago and "validator" is in the run name
    if time_diff.days < 3 and "validator" in run.name:
        print(f"Processing run: {run.name}")

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

            # Save the extracted data to a JSON file
            output_path = os.path.join(os.path.dirname(__file__), f"wandb_original_format_data_{run.name}.json")
            with open(output_path, 'w') as f:
                json.dump(converted_data, f)