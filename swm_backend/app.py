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
    except:
        return {"failure":'0'}
    finally:
        print("IN final block of get_data")
        #Can delete delete data_file.json in future

@app.route("/get_table", methods=["GET"], strict_slashes=False)
@cross_origin(support_credentials=True)
def send_table():
    print("send_table called")

    file = open('output_final.csv', 'r')
    table_data = file.read()
    print(table_data)
    try:
        print("Sending table data")
        data = json.load(table_data)
        return data
    
    except:
        print("Error!!!!!!!!: ", table_data)
        print("-----------")
        return table_data
    finally:
        print("IN final block of table_data")
        #Can delete delete data_file.json in future
    

if __name__=='__main__':
    app.run(debug=True, port=5002, use_reloader=False)



'''
data =  open("./summary_table_1.csv", 'r')
        print(data)
            #table_data = json.load(data)
        return data


'''