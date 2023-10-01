from flask import Flask, request
from flask_cors import CORS, cross_origin
import json
import gurobi as gc
import csv_convert 
import json_convert
import csv
import pandas as pd

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route("/send", methods=["POST"], strict_slashes=False)
@cross_origin(support_credentials=True)
def receive_data():
   
    locations = request.json
    print(locations)
    try:
        with open("route_data.py", "w") as json_file:
           json.dump(locations, json_file)
    except:
        print("Error while writing to file")
    finally:
        pass

    gc.main()
    csv_convert.main()
    
    return {'success':'1'}

@app.route("/get_data", methods=["GET"], strict_slashes=False)
@cross_origin(support_credentials=True)
def send_data():
    try:
        with open("data_file.json", "r") as data:
            route_data = json.load(data)
        return route_data
    except Exception as err:
        print(err)
        return {"failure":'0'}
    finally:
        pass
        #Can potentially delete delete data_file.json in future

@app.route("/get_route_tables", methods=["GET"], strict_slashes=False)
@cross_origin(support_credentials=True)
def send_route_tables():
    print("get_route_tables called")

    file_1 = open('output_final1.csv', 'r')
    file_2 = open('output_final2.csv', 'r')
    file_3 = open('node_locations.csv', 'r')
    try:
        print("Sending route table data")
        data1 = file_1.read()
        data2 = file_2.read()
        data3 = file_3.read()
        return [data1, data2, data3]
    
    except Exception as err:
        print("Error!! ", err)
        return {"errorcode":1}
    finally:
        pass
        #Can potentially delete delete data_file.json in future

@app.route("/get_location_data", methods=["GET"], strict_slashes=False)
@cross_origin(support_credentials=True)
def send_location_data():
    print("get_location_data called")

    file_1 = open('Location_Format.csv', 'r')
    try:
        print("Sending location data")
        data1 = file_1.read()
        return [data1]
    
    except Exception as err:
        print("Error!! ", err)
        return {"errorcode":1}
    finally:
        pass
        #Can potentially delete delete data_file.json in future

@app.route("/get_csv_and_compute", methods=["POST"], strict_slashes=False)
@cross_origin(support_credentials=True)
def get_csv_and_compute():
    print("get_csv_and_compute called")

    locations = request.json
    print(locations)
    json_convert.convert(locations)
   
    try:
        print("Computing routes from CSV data")
        gc.main()
        csv_convert.main()
        
        return {'status':"done"}
    
    except Exception as err:
        print("Error!! ", err)
        return {"errorcode":1}
    finally:
        pass
        #Can potentially delete delete data_file.json in future

@app.route("/get_summary_tables", methods=["GET"], strict_slashes=False)
@cross_origin(support_credentials=True)
def send_summary_tables():
    print("get_summary_tables called")

    file_1 = open('echelon_output.csv', 'r')
    file_2 = open('facility_output.csv', 'r')
   
    try:
        print("Sending summary table data")
        data1 = file_1.read()
        data2 = file_2.read()
        return [data1, data2]
    
    except Exception as err:
        print("Error!! ", err)
        return {"errorcode":1}
    finally:
        pass
        #Can potentially delete delete data_file.json in future
    
if __name__=='__main__':
    app.run(debug=True, port=5002, use_reloader=False)
