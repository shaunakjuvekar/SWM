import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import APIService from "./APIService";
import "./Tables.css"
import { CsvToHtmlTable } from 'react-csv-to-table';
//import {Link} from "react-router-dom";
//import csvPath from "./output_final.csv"
//import csvFile from "./assets/output_final.csv";


function Table() {

    const [summaryData, setData] = useState([])
    //console.log(summaryData)

    function showTable(){
        console.log("In showTable()")
        let tableData = async () => {
            const table_data = await APIService.getTableOne()
            await new Promise(r => setTimeout(r, 200));
            setData(table_data)
            //console.log(summaryData);
        }
        let td = tableData();
    }

    const downloadTxtFile = () => {
        
        console.log("Download logic goes here")
        

        // file object
        const file = new Blob([summaryData], {type: 'text/csv'});

    // anchor link
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = "Summary Table-Routes" + ".csv";
    
    // simulate link click
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();


    }

    return (
        <div className="table-container">
            <h3 className="summary">
                Summary Table 1:
            </h3>
            <Button className='submitTableButton' onClick={showTable}>Show Summary Table</Button>
            {summaryData.length>0?<div>
                <CsvToHtmlTable
                data={summaryData}
                csvDelimiter=";"
                tableClassName="table table-striped table-hover"
            />
      

            <div >
                <Button className="downloadButton" id="downloadBtn" onClick={downloadTxtFile} value="download">Download File</Button>
            </div>
            </div>
            :<></>}
        </div>
      

    );

    
}

export default Table;