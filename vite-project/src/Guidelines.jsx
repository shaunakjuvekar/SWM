import React from "react";
import "./Guidelines.css";

function Guidelines(){



    return (
        <div className="guide">
        <div className="grid-container">
            <h2>
                Guidelines
            </h2>
            <p>
            This is a system where the user can enter the precise location of the customer nodes and facilities along with their required parameters and then accordingly return optimized routes for efficient waste collection.
We’ve outlined below the steps to be followed for using the system :-
            </p>
            <ol>
                <li>On the Home Page, you can find the motivation, background and details about the team who worked on the project.</li> 
                <li>Firstly, the user can go to the ‘Map’ link found on the navigation bar.</li>
                <li>The map navigation is quite user friendly and intuitive, the user can scroll to zoom in/out and can navigate around by left clicking and then moving the mouse cursor accordingly.</li>
                <li>The user can then select the designated planning area in the search bar located to the top left corner of the map. They can enter both the name of the area or the zip code.</li>
                <li>Once in the area, the user can start placing markers on the map by left clicking on their desired location. The markers have the following options:- </li>
                <ul>
                    <li>Demand/Location cost - User can enter the appropriate value (number) here.</li>
                    <li>Node label - User can enter the name of the specific location (eg. Statue of Liberty)</li>
                    <li>Delete button - User can delete the marker after it has been placed.</li>
                    <li>Submit - The values entered by the user are saved for that particular marker.</li>
                </ul>
                <li>Once all the markers for a particular echelon have been placed, the user can click the blue Submit button at the top right corner. This will clear out all the markers for the next level.</li>
                <li>Starting from Echelon 2, the user has the additional option of entering Facility size(s), Facility cost(s) and Vehicle capacity.</li>
                <p>A sample input for these values would be :-</p>
                <ul>
                    <li>Facility size(s) - 10,15,20   (comma separated values) </li>
                    <li>Facility cost(s) - 8, 12, 16  (comma separated values)</li>
                    <li>Vehicle capacity - 9</li>
                </ul>
                    
                <li>There are a few checks implemented in the system such as user *must* assign a label to every marker in a level and the demand/facility cost *must* be a number.</li>
                <li>Once all the markers for all levels have been placed, the user can click the red ‘Calculate’ button. This will send all the data the user has input to the backend for processing.</li>
                <li>After this, a ‘View Routes’ button will be visible. Once the user clicks on it, there will be multiple buttons visible on the map. A quick description of these buttons :-</li>
                <ul>
                    <li>Show All Facilities - Shows all activated facilities based on the user input on the map.</li>
                    <li>Show All Routes - Shows all the routes from all levels on the map.</li>
                    <li>Echelon level Routes- Dropdown which shows routes based on echelon level.</li>
                    <li>Facility Level Routes - Dropdown which shows routes based on facility level.</li>
                    <li>Toggle Popups - This button activates/deactivates all the popups of the nodes for better readability of the routes.</li> 
                </ul>	
                <li>For a table representation of the routes, the user can click on the ‘Route Tables’ link on the navigation bar. After clicking on the Show Tables button, two tables will be displayed on the page, one table each per echelon level. In addition, user can click on the download buttons to download the respective CSV route file on their local machine.</li>
        </ol>
    </div>
    </div>

    )
}

export default Guidelines;