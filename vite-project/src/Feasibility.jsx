import React from "react";
import "./Guidelines.css";
import { Link, Routes, Route } from 'react-router-dom';
import feasibility from "./assets/screenshots/feasibility.png";

function Feasibility(){

    console.log("In Feasibility")


    const imgStyles1 = {
        height: 400,
        width: 700,
        marginTop: 20,
        marginBottom: 20,
        paddingRight: 10
    }


    return(
        <div className="grid-container-fb">
            <h2 style={{marginTop: 20}}>
                Feasibility  
            </h2>
            <p>
                <Link to="/guidelines">Click to go back to Guidelines</Link>
            </p>
            <p>
            The waste collection network designed using <b>SWEEP</b> assumes single visit to customer and facility nodes for collection of waste. Therefore, to generate a network design it is essential to have sufficient vehicle capacity to collect the waste in a single visit. For instance, the input value for vehicle capacity for echelon 2 should be greater than or equal to the maximum demand value amongst the customers. Similarly, for echelon t where , the value of vehicle capacity should be greater than or equal the maximum size value amongst the containers/facilities in echelon t-1. 

            </p>
            <h4 className="mini-heading">
            <u>Recommendations for producing a feasible network configuration</u>

            </h4>
            <p>
            Due to the single visit for collection of waste from the respective node, the allocated facility would receive the entire amount of waste collected from the node. Therefore, for echelon 2, the container size should be greater than or equal to the maximum demand values amongst the customers. Similarly, for echelon t where , size of the facility should be greater than or equal to the maximum size value amongst the containers/facilities in echelon t-1.  

            </p>
            <p>
            Another important factor to consider for feasibility of the network is the number of possible locations for containers/facilities. The number of possible facility/container locations at echelon , depends on the waste accumulated/generated at echelon t-1 and the size of facility/container in echelon t. 

            </p>
            <p>
            If the mentioned conditions for the size of containers/facilities are followed, then having the number of possible locations of facility/container at echelon atleast equal to the number of demand points, would guarantee the feasibility of the output model. Otherwise, the feasibility is subject to values of demand, vehicle of size, facility/container size, and the number of nodes in each echelon.

            </p>
            <h4 className="mini-heading">
            <u>When Vehicle Capacity is less than the maximum waste generated/accumulated:</u>

            </h4>
            <p>
            In a practical sense, it is possible that the amount of waste generated by a source is greater than the capacity of the vehicle used to pick up the waste from the respective echelon. Under these circumstances, the user can define multiple child nodes for the same location such that the demand of each child node is atmost equal to the collection vehicle capacity, and the sum of demand values of all the child nodes equals the total demand of the original node.

            </p>
            <img src={feasibility} alt="feasiblity" style={imgStyles1}></img>
            <p>
            For instance, if a source has a demand value of 500 kgs, and the capacity of collection vehicle is 300 kgs, then using SWEEP a user can choose to split the source into 2 nodes, each with 250kgs as their demand value. Any other configuration for the split is valid if the maximum demand of node is less than vehicle capacity which in this case is 300 kgs.

            </p>
            <p>
            Similarly, for echelon t, where , if design requires the user to use facilities with capacity greater than the vehicle capacity of echelon t+1, then facility(ies) in this echelon can be defined by selecting multiple nodes at the same location. The container/facility size for echelon t should be kept below or equal to the vehicle capacity of echelon t+1.
            </p>
        </div>
    )
}


export default Feasibility