import json
import csv


def convert(data):
    print('inside json convert')
    text_data = data

    # Split the text into lines
    lines = text_data.split('\n')

    # Create a CSV reader with custom settings
    csv_reader = csv.reader(lines, delimiter=',', quotechar='"')

    # Read the header row
    field_names = next(csv_reader)

    # Initialize a list to store dictionaries
    json_data = []

    # Iterate through the CSV rows and create dictionaries
    for row in csv_reader:
        data_dict = {}
        for i in range(len(field_names)):
            value = row[i].strip()
            if value.startswith('[') and value.endswith(']'):
                try:
                    # Attempt to parse the value as a JSON array
                    value = json.loads(value)
                except json.JSONDecodeError:
                    pass  # If parsing fails, keep the original value
            data_dict[field_names[i]] = value
        json_data.append(data_dict)

    # Serialize the JSON data list to a JSON string
    json_result = json.dumps(json_data, indent=2)

    # Print the JSON result
    print(json_result)
