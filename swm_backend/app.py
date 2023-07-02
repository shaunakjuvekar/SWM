from flask import Flask, request, send_file
from io import BytesIO
from flask_cors import CORS, cross_origin
import json
import gurobi as gc
import csv
import csv_convert 

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route("/send", methods=["POST"], strict_slashes=False)
@cross_origin(support_credentials=True)
def receive_data():
    #title = request.json['title']
    #body = request.json['body']
    locations = request.json
    #print(locations)
    
    try:
        with open("route_data.py", "w") as json_file:
            json.dump(locations, json_file)
            
            
    except:
        print("Error while writing to file")
    
    finally:
        print("Finally Block")

    gc.main()
    csv_convert.main()
    
    return {'success':'1'}

@app.route("/get_data", methods=["GET"], strict_slashes=False)
@cross_origin(support_credentials=True)
def send_data():
    try:
        with open("data_file.json", "r") as data:
            route_data = json.load(data)
        print("get_data called")
        return route_data
    except Exception as err:
        print(err)
        return {"failure":'0'}
    finally:
        print("IN final block of get_data")
        #Can delete delete data_file.json in future

@app.route("/get_route_tables", methods=["GET"], strict_slashes=False)
@cross_origin(support_credentials=True)
def send_route_tables():
    print("get_route_tables called")

    file_1 = open('output_final1.csv', 'r')
    file_2 = open('output_final2.csv', 'r')
    try:
        print("Sending route table data")
        data1 = file_1.read()
        data2 = file_2.read()
        return [data1, data2]
    
    except Exception as err:
        print("Error!!", err)
        return {"errorcode":1}
    finally:
        print("IN final block of get_route_tables")
        #Can delete delete data_file.json in future

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
        print("Error!!", err)
        return {"errorcode":1}
    finally:
        print("IN final block of get_summary_tables")
        #Can delete delete data_file.json in future
    

if __name__=='__main__':
    app.run(debug=True, port=5002, use_reloader=False)
