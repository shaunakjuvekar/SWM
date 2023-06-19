import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import APIService from "./APIService";
import "./Tables.css"
import { CsvToHtmlTable } from 'react-csv-to-table';



function Table() {

    console.log("In Table 1")
    const [summaryData, setData] = useState([])
    console.log(summaryData)

    function showTable(){
        console.log("In showTable()")
        let tableData = async () => {
            const table_data = await APIService.getTableOne()
            await new Promise(r => setTimeout(r, 200));
            setData(table_data)
            console.log(summaryData);
        }

        let td = tableData();

    }

    return (
        <div className="table-container">
            <h3 className="summary">
                Summary Table 1:
            </h3>
            <Button className='submitButton' onClick={showTable}>Show Summary Table</Button>
            {summaryData.length>0?<CsvToHtmlTable
                data={summaryData}
                csvDelimiter=","
                tableClassName="table table-striped table-hover"
            />:<></>}
        </div>
      

    );

    
}

export default Table;