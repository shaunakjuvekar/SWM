import React from "react";
import "./Guidelines.css";
import searchBar from "./assets/screenshots/Search bar.png";
import marker from "./assets/screenshots/Filled marker.png";
import cost_validation from "./assets/screenshots/Cost validation.png";
import label_check from "./assets/screenshots/Label check.png";
import text_area from "./assets/screenshots/Right text area.png";
import route_buttons from "./assets/screenshots/Route buttons.png";
import popups from "./assets/screenshots/Toggle popups.png";
import routes from "./assets/screenshots/Routes.png";
import routeTables from "./assets/screenshots/Route tables.png";
import summaryTables from "./assets/screenshots/Summary tables.png";


function Guidelines(){

    const imgStyles1 = {
        height: 300,
        width: 500,
        marginTop: 20,
        marginBottom: 20,
        paddingRight: 10
    }

    const imgStyles2 = {
        height: 400,
        width: 700,
        marginTop: 20,
        marginBottom: 20,
        paddingRight: 10
    }



    return (
        <div className="guide">
        <div className="grid-container">
            <h2 style={{marginTop: 20}}>
                Guidelines
            </h2>
            <p>
            This is a system where the user can enter the precise locations of customer nodes and locations of facilities along with their required parameters and then return an optimized potential plan for locating facilities and routes for collecting waste and transporting it to a centralized facility.
The steps to be followed for using the system are as follows:
            </p>
            <ol>
                <li>The motivation, background and details about the team who worked on SWEEP are on the <b>Home</b> page.</li> 
                <li>Select the <b>Map</b> link found in the <b>Input</b> dropdown menu. The map navigation is quite user friendly and intuitive, the user can scroll to zoom in/out and can navigate around by left clicking and then moving the mouse cursor accordingly.</li>
                
                <li>Select the designated planning area in the <b>search bar</b> located towards the top left corner of the map. Enter both the name of the area or the zip code.</li>
                <img src={searchBar} style={imgStyles1}></img>
                <li>Once in the area, start placing markers on the map by left clicking on the desired location indicating customers/facilities. The markers have the following options:- </li>
                <ul>
                    <li><b>Demand/Location cost</b> - User can enter the appropriate value (number) here.</li>
                    <li><b>Node label</b> - User can enter the name of the specific location (eg. Statue of Liberty)</li>
                    <li><b>Delete button</b> - User can delete the marker after it has been placed.</li>
                    <li><b>Submit</b> - The values entered by the user are saved for that particular marker.</li>
                </ul>
                
                <p>Note: Markers of echelon 1 depict customers while markers of other echelons depict potential facility locations.</p>
                
                <img src={marker} style={imgStyles1}></img>
                <p>Note: There are a few checks implemented in the system such as the user <b>must</b> assign a label to every marker and the demand/facility cost <b>must</b> be a number.</p>
                <img src={cost_validation} style={imgStyles1}></img>
                <img src={label_check} style={imgStyles1}></img>
                <li>Once all the markers for a particular echelon have been placed, click the <b>Submit</b> button at the top right corner. This will clear out all the markers and prepare the map for the next echelon.</li>
                
                <p>Note: Starting from Echelon 2, the user has the additional option of entering <b>Facility size(s), Facility cost(s) and Vehicle capacity</b>.</p>
                <p>A sample input for these values would be :-</p>
                <ul>
                    <li><b>Facility size(s)</b> - 10,15,20   (comma separated values) </li>
                    <li><b>Facility cost(s)</b> - 8, 12, 16  (comma separated values)</li>
                    <li><b>Vehicle capacity</b> - 9</li>
                </ul>
                <p>Note: The unit for facility size and vehicle capacity should be the same.</p>
                <img src={text_area} style={imgStyles1}></img>    
                <li>Once all the markers for all echelons have been placed, click the <b>Calculate</b> button. This will send all the data the user has input to the backend for processing.</li>
                <li>Once the user clicks on the <b>View Routes</b> button, there will be multiple buttons visible on the map. These are as follows:</li>
                <img src={route_buttons} style={imgStyles2}></img>    
                <ul>
                    <li><b>Show All Facilities</b> - Shows all activated facilities based on the user input on the map.</li>
                    <li><b>Show All Routes</b> - Shows all the routes from all echelons on the map.</li>
                    <img src={routes} style={imgStyles2}></img>
                    <li><b>Echelon level Routes</b> - Dropdown which shows routes for each echelon level.</li>
                    <li><b>Facility Level Routes</b> - Dropdown which shows routes for each facility level.</li>
                    <li><b>Toggle Popups</b> - This button activates/deactivates all the popups of the nodes for better readability of the routes.</li> 
                </ul>	
                <img src={popups} style={imgStyles1}></img>
                <li>For a tabular representation of the routes, click on the <b>Route Tables</b> link in the <b>Output</b> dropdown menu. 
                After clicking on the <b>Show Tables</b> button, two tables will be displayed on the page, one table each per echelon level. In addition, click on the download buttons to download the respective CSV route file to your local machine.</li>
                <img src={routeTables} style={imgStyles2}></img>    
                <li>For a summary representation, click on the <b>Summary Tables</b> link in the <b>Output</b> dropdown menu. After clicking on the <b>Show Tables</b> button, two tables will be displayed on the page, one echelon level and one facility level summary table. In addition, click on the download buttons to download the respective CSV route file to your local machine.</li>
                <img src={summaryTables} style={imgStyles2}></img>    
        </ol>
    </div>
    </div>

    )
}

export default Guidelines;