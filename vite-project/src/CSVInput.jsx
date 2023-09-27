import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { CsvToHtmlTable } from 'react-csv-to-table';
import APIService from "./APIService";
  

function CSVInput(){


    const [locationData, setLocationData] = useState([])
    const [fileData, setFileData] = useState();

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


return (
    <div className="grid-container" style={{marginTop: 20}}>
        <h2>CSV Input Page</h2>
        <p>Upload your CSV file here:</p>
        <form>
            <input
                type={"file"}
                id={"csvFileInput"}
                accept={".csv"}
                onChange={handleOnChange}
            />
                <Button size='sm' className="uploadCSVButton" onClick={(e) => {
                    UploadCSVFile(e);
                }}>Upload CSV</Button>
            
        </form>
       
        <br></br>
        <p style={{marginTop: 10}}>This is the expected data format for the CSV:</p>
        <Button size='sm' onClick={showTable}>Show Format</Button>
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
    </div>
    
    )

}

export default CSVInput;