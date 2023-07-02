import csv
import ast
import json
import re

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
            obj = {}
            lat, long, id, cost_demand, node_label = row[0], row[1], row[2], row[3], row[4]
            echelon, index = row[5], row[6]
            routes, route_costs = row[10], row[11]
            obj['lat'], obj['lng'], obj['label'], obj['echelon'] =lat,long, node_label, echelon
            obj['routes'], obj['route_costs'] = routes, route_costs
          
            if echelon=='2' and file1_flag==False:
                write_file_1.writerow([' -', 'Facility', ' Echelon'])
                file1_flag = True
            elif echelon=='3' and file2_flag==False:
                write_file_2.writerow([' -', 'Facility', ' Echelon'])
                file2_flag = True
            else:
                print("This echelon number not handled : ", echelon)
            frontend_data.append(obj)
            if routes and row_number!=0:
                #print("routes:" , routes)
                if echelon=='2':
                    write_file_1.writerow(['Values ', node_label, echelon])
                    write_file_1.writerow(['Vehicle', 'Node Label(s) served in echelon '+str(int(echelon)-1), 'Route Cost'])
                elif echelon=='3':
                    write_file_2.writerow(['Values ', node_label, echelon])
                    write_file_2.writerow(['Vehicle', 'Node Label(s) served in echelon '+str(int(echelon)-1), 'Route Cost'])
                else:
                    print("This echelon number not handled : ", echelon)
                routes_arr = (ast.literal_eval(routes))
                costs_arr = (ast.literal_eval(route_costs))
                for i in range(len(routes_arr)):
                    truncated_cost = round(float(costs_arr[i]), 2)
                    if echelon=='2':
                        write_file_1.writerow([i+1, routes_arr[i], truncated_cost])
                    elif echelon=='3':
                         write_file_2.writerow([i+1, routes_arr[i], truncated_cost])
                    else:
                        print("This echelon number not handled : ", echelon)    
            
                write_file_1.writerow([])
                write_file_2.writerow([])
            row_number+=1
        #print(frontend_data)


    with open("data_file.json", "w") as wf:
        print("Writing to data_file.json")
        json.dump(frontend_data[1:], wf)
#main()