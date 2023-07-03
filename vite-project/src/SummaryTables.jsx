import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import APIService from "./APIService";
import "./RouteTables.css"
import { CsvToHtmlTable } from 'react-csv-to-table';
//import {Link} from "react-router-dom";
//import csvPath from "./output_final.csv"
//import csvFile from "./assets/output_final.csv";


function SummaryTables() {

    const [summaryData_1, setData_1] = useState([])
    const [summaryData_2, setData_2] = useState([])
    //console.log(summaryData)

    function showSummaryTable(){
        console.log("In showSummaryTable()")
        let tableData = async () => {
            const table_data = await APIService.getSummaryTables()
            await new Promise(r => setTimeout(r, 200));
            setData_1(table_data[0])
            setData_2(table_data[1])
            console.log(table_data);
        }
        let td = tableData();
    }

    const downloadTxtFile1= () => {

    // file object
        const file = new Blob([summaryData_1], {type: 'text/csv'});

    // anchor link
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = "Echelon Summary Table 1" + ".csv";
    
    // simulate link click
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    const downloadTxtFile2 = () => {

        // file object
            const file = new Blob([summaryData_2], {type: 'text/csv'});
    
        // anchor link
            const element = document.createElement("a");
            element.href = URL.createObjectURL(file);
            element.download = "Facility Summary Table 2" + ".csv";
        
        // simulate link click
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }

    return (
        <div className="table-container">
            <div className='route-about'>
                <h2 className="summary">
                    Summary Tables:
                </h2>
                <p className="table-para">
                    The Echelon Table below summarizes the number of facilities, number of vehicles and total cost 
                    associated with each echelon. 
                    <br></br>
                    The Facility Table summarizes the details associated with each facility in more depth.
                </p>

            </div>
           
            <Button className='submitTableButton' onClick={showSummaryTable}>Show Tables</Button>
            {summaryData_1.length>0?<div className="csv-container">
                
                
                <span>
                    <h3 className="table-heading"> Echelon summary table</h3>
                    <CsvToHtmlTable
                data={summaryData_1}
                csvDelimiter=";"
                hasHeader = 'true'
                tableClassName="table table-striped table-hover"
                />
                </span>
                   
                <span>
                <h3 className="table-heading">Facility summary table</h3>
                <CsvToHtmlTable
                data={summaryData_2}
                csvDelimiter=";"
                tableClassName="table table-striped table-hover"
                />
                </span>
                
            
      

            <div >
                <Button className="downloadButton1" onClick={downloadTxtFile1} value="download">Download File 1</Button>
            </div>
            <Button className="downloadButton2" onClick={downloadTxtFile2} value="download">Download File 2</Button>
            </div>
            :<></>}
        </div>
      

    );

    
}

export default SummaryTables;