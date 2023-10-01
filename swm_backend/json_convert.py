import ast
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
    json_data = [[],[],[]]
    index_map = {0:0, 1:0, 2:0}
    # Iterate through the CSV rows and create dictionaries
    for row in csv_reader:
        echelon_flag = 1
        data_dict = {}
        for i in range(len(field_names)):
            if len(row)==0:
                pass
            else:   
                value = row[i].strip()
                if value.replace("-", "").replace(".", "").isnumeric():
                    value = float(value)

                #print(str(value), " => ", type(value))
                # if type(value)==str and value.startswith('[') and value.endswith(']'):
                #     try:
                #         # Attempt to parse the value as a JSON array
                #         value = (ast.literal_eval(value))
                        
                #     except RuntimeError:
                #         pass  # If parsing fails, keep the original value
                data_dict[field_names[i]] = value

        if data_dict != {}:
            print("data_dict :" , data_dict)
            echelon_flag = int(data_dict['echelon'])
            index_map[echelon_flag-1] += 1
            data_dict['index'] = index_map[echelon_flag-1]
            json_data[echelon_flag-1].append(data_dict)
    
    print(json_data)

    # Serialize the JSON data list to a JSON string
    #json_result = json.dumps(json_data)
    with open("route_data.py", "w") as json_file:
           json.dump(json_data, json_file)

    # Print the JSON result
    #print(json_result)
