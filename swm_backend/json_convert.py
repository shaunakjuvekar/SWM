import ast
import json
import csv


def convert(data):
    print('inside json convert')
    text_data = data

    
    lines = text_data.split('\n')

    csv_reader = csv.reader(lines, delimiter=';', quotechar='"')

    json_data = [[], [], []]
    index_map = {0: 0, 1: 0, 2: 0}

    # Skip the header row if present
    header_row = next(csv_reader)
    field_names = header_row
    # print("Field Names: ", field_names)
    # Iterate through the remaining rows
    for index, row in enumerate(csv_reader, start=1):  # Start index at 1 to avoid header row
        if row:  # Check if row is not empty
            print("Row:", row)
            echelon_flag = 1
            data_dict = {}
            for i, value in enumerate(row):
                value = value.strip()
                if value.replace("-", "").replace(".", "").isnumeric():
                    value = float(value)
                # print(i)
                # print("field_names[i]: ", field_names[i])
                print("value: ", value)
                if (field_names[i] == 'facility_costs' or field_names[i] == 'facility_sizes') and value.find('[') != -1:
                    # value = list(value)
                    # value = ast.literal_eval(value)
                    print("Check val: ", value)
                    
                data_dict[field_names[i]] = value

        if data_dict != {}:
            echelon_flag = int(data_dict['echelon'])
            index_map[echelon_flag - 1] += 1
            data_dict['index'] = index_map[echelon_flag - 1]
            json_data[echelon_flag - 1].append(data_dict)
    
    print("json_data: ", json_data)

    with open("route_data.py", "w") as json_file:
           json.dump(json_data, json_file)

    #print(json_result)
