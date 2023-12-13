import json
from utils.upload import upload
from utils.script import init_wandb, calculate_best_average_loss, filter_recent_data

def handler(event, context):
    all_run_data = init_wandb()
    output = calculate_best_average_loss(all_run_data)
    sorted_output = sorted(output, key = lambda ele  : ele["timestamp"]) # Ref: https://stackoverflow.com/questions/72899/how-to-sort-a-list-of-dictionaries-by-a-value-of-the-dictionary-in-python
    recent_data = filter_recent_data(sorted_output)
    upload(sorted_output, filename = "history.json")
    upload(recent_data, filename="recent.json")

    return {
        "statusCode": 200,
        "body": json.dumps("Multi.json file updated successfully."),
    }
