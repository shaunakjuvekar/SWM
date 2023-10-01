import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { CsvToHtmlTable } from 'react-csv-to-table';
import APIService from "./APIService";
import Routes from "./Routes"
import "./RouteTables.css"
import SearchBar from "./SearchBar";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
  

function CSVInput(){

    const initPosition = [37.229572, -80.4139]

    const [locationData, setLocationData] = useState([])
    const [fileData, setFileData] = useState();
    const [viewRoutes, setViewRoutes] = useState([]);

    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFileData(e.target.files[0]);
      };
    

    function showTable(){
        console.log("In showTable() CSV")
        
        let tableData = async () => {
            const table_data = await APIService.getLocationData()
            
            await new Promise(r => setTimeout(r, 200));
            //console.log(table_data);
            setLocationData(table_data[0])
            
        }
        let td = tableData();
    }



    const UploadCSVFile= (e) => {
        e.preventDefault();
        
        if (fileData) {
            fileReader.onload = function (event) {
                const csvOutput = event.target.result;
                console.log(csvOutput)
                APIService.sendLocationData(csvOutput)
         
            };
            fileReader.readAsText(fileData);
        }
       
    }

    const routeHandler = (e) => {
        setViewRoutes(true)
    }

    const inputContainerStyles = {
        textAlign: 'left',
        fontWeight: 'bold',
        fontFamily: 'OpenSans'
    }


return (
    <div className="grid-container" style={{marginTop: 20}}>
        <h2>CSV Input Page</h2>
        <div style={inputContainerStyles}>
            <h6 style={{paddingBottom: '1rem'}}>Upload your CSV file here:</h6>
            <form>
                <input
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnChange}
                />
                    <Button size='sm' className="uploadCSVButton" style={{borderRadius: '15px'}} onClick={(e) => {
                        UploadCSVFile(e);
                    }}>Upload CSV</Button>
                
            </form>
            <Button variant="info" size='sm' onClick={routeHandler} style={{marginTop: '1.5rem', marginBottom: '1.5rem', borderRadius: '15px'}}>View Routes</Button>
        </div>
        

        
        {viewRoutes==false?
        <div style={inputContainerStyles}>
            <br></br>
            <h6 style={{marginTop: 10}}>This is the input template for the CSV:</h6>
            <Button size='sm' style={{borderRadius: '15px'}} onClick={showTable}>Show Format</Button>
            {locationData.length>0?<div style={{marginTop: 20}}>
                <span>
                    <h5 className="table-heading">Expected Location Format</h5>
                    <CsvToHtmlTable
                    data={locationData}
                    csvDelimiter=";"
                    hasHeader = 'true'
                    tableClassName="table table-striped table-hover"
                    />
                </span>
            </div>:<></>}
        </div>:
         <MapContainer className='leaflet-container' center={initPosition} zoom={13} scrollWheelZoom={true}>
         <SearchBar />
         <TileLayer
           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
        <Routes></Routes>
        </MapContainer>
        }

    </div>
    
    
    )

}

export default CSVInput;