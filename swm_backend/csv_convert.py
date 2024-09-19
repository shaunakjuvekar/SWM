import csv
import ast
import json

def main():
    frontend_data = []
    print("csv_convert called from app.py")
    with open('sample_output.csv', 'r', newline='') as inputFile, \
         open('output_final1.csv', 'w', newline='') as writerFile1, \
         open('output_final2.csv', 'w', newline='') as writerFile2:
        
        read_file = csv.reader(inputFile)
        write_file_1 = csv.writer(writerFile1, delimiter=';')
        write_file_2 = csv.writer(writerFile2, delimiter=';')
        row_number=0
        file1_flag, file2_flag = False, False
        for row in read_file:
            print(row)
            obj = {}
            
            lat, long, cost_demand, node_label = row[0], row[1], row[2], row[3]
            echelon, index = row[4], row[5]
            routes, route_costs = row[10], row[11]
            obj['lat'], obj['lng'], obj['label'], obj['echelon'] =lat,long, node_label, echelon
            obj['routes'], obj['route_costs'] = routes, route_costs
            #print("on line 24", echelon, type(echelon))
            if row_number!=0 and int(float(echelon))==2 and file1_flag==False:
                # print("inside if...line 28")
                write_file_1.writerow(['Facility', 'Vehicle', 'Customers served in echelon '+str(int(float(echelon))-1), 'Route Cost($)'])
                file1_flag = True
            elif row_number!=0 and int(float(echelon))==3 and file2_flag==False:
                write_file_2.writerow(['Facility', 'Vehicle', 'Facilities served in echelon '+str(int(float(echelon))-1), 'Route Cost($)'])
                file2_flag = True
            else:
                pass
            frontend_data.append(obj)
            if routes and row_number!=0:
                #print("routes:" , routes)
                #print("on line 36")
                
                routes_arr = (ast.literal_eval(routes))
                costs_arr = (ast.literal_eval(route_costs))
                for i in range(len(routes_arr)):
                    truncated_cost = round(float(costs_arr[i]), 2)
                    if int(float(echelon))==2:
                        write_file_1.writerow([node_label, i+1, routes_arr[i], truncated_cost])
                    elif int(float(echelon))==3:
                         write_file_2.writerow([node_label, i+1, routes_arr[i], truncated_cost])
                    else:
                        pass 
            
                write_file_1.writerow([])
                write_file_2.writerow([])
            row_number+=1
        #print(frontend_data)

    print(write_file_1)
    with open("data_file.json", "w") as wf:
        #print("Writing to data_file.json")
        json.dump(frontend_data[1:], wf)
#main()