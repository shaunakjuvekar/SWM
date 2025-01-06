import ast

# Load the route data from the file
with open('route_data_karnal.py', 'r') as file:
    data = ast.literal_eval(file.read())

# Open a CSV file for writing
with open('node_locations.csv', 'w') as f:
    # Write the CSV header
    f.write('Echelon,Node_Name,Latitude,Longitude\n')

    # Write data rows
    for echelon_group in data:
        for node in echelon_group:
            echelon = node["echelon"]
            node_name = node["node_label"]
            latitude = node["lat"]
            longitude = node["lng"]
            f.write(f"{echelon},{node_name},{latitude},{longitude}\n")

print("CSV conversion complete.")
