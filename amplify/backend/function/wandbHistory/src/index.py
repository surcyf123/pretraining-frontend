import json
from utils.upload import upload
from utils.script import init_wandb, calculate_best_average_loss

def handler(event, context):
    all_run_data = init_wandb()
    output = calculate_best_average_loss(all_run_data)
    sorted_output=sorted(output, key = lambda ele  : ele["timestamp"]) # Ref: https://stackoverflow.com/questions/72899/how-to-sort-a-list-of-dictionaries-by-a-value-of-the-dictionary-in-python
    upload(sorted_output, filename = "history.json")

    return {
        "statusCode": 200,
        "body": json.dumps("Multi.json file updated successfully."),
    }
