import json
import logging

import pandas as pd
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

import bing_csv_convert
import csv_convert
import gurobi as gc
import json_convert
import store_locations

# Set up the logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/send")
async def receive_data(request: Request) -> JSONResponse:
    locations = await request.json()
    logger.info("Received data: %s", locations)
    try:
        with open("route_data.py", "w") as json_file:
            json.dump(locations, json_file)
    except Exception as e:
        logger.error("Error while writing to file: %s", e)
        raise HTTPException(status_code=404, detail={"failure": "0", "error": "File not found"})

    # Call Gurobi solver
    gc.main()

    # Convert the Gurobi output into a json file format
    csv_convert.main()

    # Store the node locations in node_locations.csv
    store_locations.main()

    return JSONResponse(content={'success': '1'}, status_code=200)


@app.get("/get_data")
async def send_data() -> JSONResponse:
    try:
        with open("data_file_karnal.json", "r") as data:
            route_data = json.load(data)
        return JSONResponse(content=route_data, status_code=200)
    except FileNotFoundError as e:
        logger.error("File not found: %s", e)
        raise HTTPException(status_code=404, detail={"failure": "0", "error": "File not found"})
    except Exception as e:
        logger.error("An error occurred: %s", e)
        raise HTTPException(status_code=500, detail={"failure": "0", "error": str(e)})


@app.get("/get_route_tables")
async def send_route_tables() -> JSONResponse:
    logger.info("get_route_tables called")
    try:
        with open('output_final1.csv', 'r') as file_1, open('output_final2.csv', 'r') as file_2, open('node_locations.csv', 'r') as file_3:
            logger.info("Sending route table data")
            data1 = file_1.read()
            data2 = file_2.read()
            data3 = file_3.read()
            return JSONResponse(content=[data1, data2, data3], status_code=200)
    except Exception as err:
        logger.error("Error!! %s", err)
        raise HTTPException(status_code=500, detail={"errorcode": 1, "error": str(err)})

@app.get("/get_location_data")
async def send_location_data() -> JSONResponse:
    logger.info("get_location_data called")
    try:
        with open('Location_Format.csv', 'r') as file_1:
            logger.info("Sending location data")
            data1 = file_1.read()
            return JSONResponse(content=[data1], status_code=200)
    except Exception as err:
        logger.error("Error!! %s", err)
        raise HTTPException(status_code=500, detail={"errorcode": 1, "error": str(err)})


@app.post("/get_csv_and_compute")
async def get_csv_and_compute(request: Request) -> JSONResponse:
    logger.info("get_csv_and_compute called")
    locations = await request.json()
    logger.info("Received locations data: %s", locations)
    json_convert.convert(locations)

    try:
        logger.info("Computing routes from CSV data")
        gc.main()
        csv_convert.main()
        return JSONResponse(content={'status': "done"}, status_code=200)
    except Exception as err:
        logger.error("Error!! %s", err)
        raise HTTPException(status_code=500, detail={"errorcode": 1, "error": str(err)})


@app.get("/get_summary_tables")
async def send_summary_tables() -> JSONResponse:
    logger.info("get_summary_tables called")
    try:
        with open('echelon_output.csv', 'r') as file_1, open('facility_output.csv', 'r') as file_2:
            logger.info("Sending summary table data")
            data1 = file_1.read()
            data2 = file_2.read()
            return JSONResponse(content=[data1, data2], status_code=200)
    except Exception as err:
        logger.error("Error!! %s", err)
        raise HTTPException(status_code=500, detail={"errorcode": 1, "error": str(err)})


@app.get("/get_coordinates")
async def get_coordinates() -> JSONResponse:
    logger.info("get_coordinates called")
    df = pd.read_csv('karnal_node_locations.csv')
    data = df.to_dict(orient='records')
    return JSONResponse(content=data, status_code=200)


@app.get("/")
async def home_route() -> JSONResponse:
    logger.info("home route called")
    return JSONResponse(content={'status': "True", 'data': 'Hello World!'})


def bing_convert_csv_to_datafile() -> int:
    try:
        bing_csv_convert.main()
    except Exception as e:
        logger.error("Error converting file: %s", e)
        return 1
    return 0


if __name__ == '__main__':
    uvicorn.run("app:app", host="0.0.0.0", port=5002, reload=True)