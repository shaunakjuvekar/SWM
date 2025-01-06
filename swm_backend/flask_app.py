import json
import logging
from typing import Tuple

import pandas as pd
from flask import Flask, Response, jsonify, request
from flask_cors import CORS, cross_origin

import bing_csv_convert
import csv_convert
import gurobi as gc
import json_convert
import store_locations

# Set up the logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route("/send", methods=["POST"], strict_slashes=False)
@cross_origin(supports_credentials=True)
def receive_data() -> Tuple[Response, int]:
    locations = request.json
    logger.info("Received data: %s", locations)
    try:
        with open("route_data.py", "w") as json_file:
           json.dump(locations, json_file)
    except Exception as e:
        logger.error("Error while writing to file: %s", e)
        return jsonify({"failure": '0', "error": "File not found"}), 404

    # Call Gurobi solver
    gc.main()   

    # Convert the Gurobi output into a json file format
    csv_convert.main()    

    # Store the node locations in node_locations.csv
    store_locations.main()

    return jsonify({'success': '1'}), 200

@app.route("/get_data", methods=["GET"], strict_slashes=False)
@cross_origin(supports_credentials=True)
def send_data() -> Tuple[Response, int]:
    try:
        with open("data_file_karnal.json", "r") as data:
            route_data = json.load(data)
        return jsonify(route_data), 200
    except FileNotFoundError as e:
        logger.error("File not found: %s", e)
        return jsonify({"failure": '0', "error": "File not found"}), 404
    except Exception as e:
        logger.error("An error occurred: %s", e)
        return jsonify({"failure": '0', "error": str(e)}), 500

@app.route("/get_route_tables", methods=["GET"], strict_slashes=False)
@cross_origin(supports_credentials=True)
def send_route_tables() -> Tuple[Response, int]:
    logger.info("get_route_tables called")

    try:
        with open('output_final1.csv', 'r') as file_1, open('output_final2.csv', 'r') as file_2, open('node_locations.csv', 'r') as file_3:
            logger.info("Sending route table data")
            data1 = file_1.read()
            data2 = file_2.read()
            data3 = file_3.read()
            return jsonify([data1, data2, data3]), 200
    except Exception as err:
        logger.error("Error!! %s", err)
        return jsonify({"errorcode": 1, "error": str(err)}), 500

@app.route("/get_location_data", methods=["GET"], strict_slashes=False)
@cross_origin(supports_credentials=True)
def send_location_data() -> Tuple[Response, int]:
    logger.info("get_location_data called")

    try:
        with open('Location_Format.csv', 'r') as file_1:
            logger.info("Sending location data")
            data1 = file_1.read()
            return jsonify([data1]), 200
    except Exception as err:
        logger.error("Error!! %s", err)
        return jsonify({"errorcode": 1, "error": str(err)}), 500

@app.route("/get_csv_and_compute", methods=["POST"], strict_slashes=False)
@cross_origin(supports_credentials=True)
def get_csv_and_compute() -> Tuple[Response, int]:
    logger.info("get_csv_and_compute called")

    locations = request.json
    logger.info("Received locations data: %s", locations)
    json_convert.convert(locations)
   
    try:
        logger.info("Computing routes from CSV data")
        gc.main()
        csv_convert.main()
        return jsonify({'status': "done"}), 200
    except Exception as err:
        logger.error("Error!! %s", err)
        return jsonify({"errorcode": 1, "error": str(err)}), 500

@app.route("/get_summary_tables", methods=["GET"], strict_slashes=False)
@cross_origin(supports_credentials=True)
def send_summary_tables() -> Tuple[Response, int]:
    logger.info("get_summary_tables called")

    try:
        with open('echelon_output.csv', 'r') as file_1, open('facility_output.csv', 'r') as file_2:
            logger.info("Sending summary table data")
            data1 = file_1.read()
            data2 = file_2.read()
            return jsonify([data1, data2]), 200
    except Exception as err:
        logger.error("Error!! %s", err)
        return jsonify({"errorcode": 1, "error": str(err)}), 500

@app.route('/get_coordinates', methods=['GET'])
def get_coordinates() -> Response:
    logger.info("get_coordinates called")

    df = pd.read_csv('karnal_node_locations.csv')
    data = df.to_dict(orient='records')
    return jsonify(data)

@app.route("/", methods=["GET"], strict_slashes=False)
@cross_origin(supports_credentials=True)
def home_route() -> Response:
    logger.info("home route called")
    return jsonify({
        'status': "True",
        'data': 'Hello World!'
    })

def bing_convert_csv_to_datafile() -> int:
    try:
        bing_csv_convert.main()
    except Exception as e:
        logger.error("Error converting file: %s", e)
        return 1
    return 0

if __name__=='__main__':
    app.run(host="0.0.0.0", port=5002)
