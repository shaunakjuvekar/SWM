import ast
import json
import csv


def convert(data):
    print('inside json convert')
    text_data = data

    
    lines = text_data.split('\n')

    csv_reader = csv.reader(lines, delimiter=',', quotechar='"')

    # Reading the header row
    field_names = next(csv_reader)

    json_data = [[],[],[]]
    index_map = {0:0, 1:0, 2:0}
    # Iterating through the CSV rows and creating dictionaries
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

                data_dict[field_names[i]] = value

        if data_dict != {}:
            echelon_flag = int(data_dict['echelon'])
            index_map[echelon_flag-1] += 1
            data_dict['index'] = index_map[echelon_flag-1]
            json_data[echelon_flag-1].append(data_dict)
    
    #print(json_data)

    with open("route_data.py", "w") as json_file:
           json.dump(json_data, json_file)

    #print(json_result)
