import React from "react";
import "./Routes.css";
import { useState } from 'react';
import APIService from "./APIService";
import { Marker, Popup, Polyline } from "react-leaflet";
import redIcon from "./assets/red_icon.png";
import {Icon} from 'leaflet';
import Button from 'react-bootstrap/Button';

function Routes(){

      
    const [markers, setMarkers] = useState([])
    const [allNodes, setNodes] = useState([])
    const [menuLabels, setMenuLabels] = useState([])
    const [currentNodes, setCurrentNodes] = useState([])
    const [currentPaths, setCurrentPaths] = useState([])
    const [colorVal, setColor] = useState('blue')

    const colorArray = ['red','orange', 'blue', 'black', 'maroon', 'blue', 'purple']
   
    let filtered_data = []
    let polylines = []
    
    console.log(markers)

    

    const markerIcon = new Icon({
    
        iconUrl: redIcon,
        iconAnchor: [28,15],
        iconSize: [32,32]
      })


    function showRoutes(){
        
        let routeData = async () => {
        const data = await APIService.getRoutes()
        setNodes(data)
        filtered_data = data.filter(e=>e.route_costs.length>0)
        setCurrentNodes(filtered_data)
        setMenuLabels(filtered_data)
        polylines = filtered_data.map(node=>[parseFloat(node.lat), parseFloat(node.lng)])
        setCurrentPaths([polylines])
        console.log("Polylines:" , [polylines])
        setMarkers(filtered_data)
        setColor(colorArray[Math.floor(Math.random()*7)])
        

    
        }
        let d = routeData();
    }

    function showLabelRoute(e){
        setColor(colorArray[Math.floor(Math.random()*7)])
        
        console.log(e)
        console.log(currentNodes)
        let current_node = currentNodes.filter(path => path['label']==e)
        console.log(current_node)
        let currentLabelNodes = JSON.parse(current_node[0]['routes'])
        let newPathMarkers = []
        for (let i=0;i<currentLabelNodes.length;i++){
            console.log(currentLabelNodes[i])
            let tempArr = []
            let addEndRoute = false
            if (currentLabelNodes[i].length>1){
                console.log("add at end")
                addEndRoute = true
            }
            tempArr.push(current_node[0].label)
            for (let j=0;j<currentLabelNodes[i].length;j++){
                tempArr.push(currentLabelNodes[i][j])
            }
            if (addEndRoute){
                tempArr.push(current_node[0].label)
            }
            newPathMarkers.push(tempArr)
        }
        console.log(newPathMarkers)
        

        currentLabelNodes = [...currentLabelNodes, [current_node[0].label]]
        console.log(currentLabelNodes)
        let allCurrentNodes = []
        currentLabelNodes.map(arr => {
            for (let i=0;i<arr.length;i++){
                allCurrentNodes.push(arr[i])
            }
        })
        console.log(allCurrentNodes)
        let newMarkers = []
        let newPathCoords = []
        allNodes.map(node1=>{
            let obj={}
            let pathArr = []
            for (let j=0;j<allCurrentNodes.length;j++){
                if (node1.label==allCurrentNodes[j]){
                    obj['label'] = allCurrentNodes[j]
                    obj['lat'] = node1['lat']
                    obj['lng'] = node1['lng']
                    newMarkers.push(obj)
                }
            }
            for (let j=0;j<newPathMarkers.length;j++){
                if (node1.label==newPathMarkers[j]){
                    pathArr.push(node1.lat)
                    pathArr.push(node1.lng)

                }
            }
            })
        console.log(newMarkers)
        setMarkers(newMarkers)
        console.log("Polylines:" , [polylines])
        //setCurrentPaths(node_routes)
        

        //setCurrentNodes([currentNodes])
        // Reassign markers from the current node and it's routes
        

        // from the new set of markers, update the polylines variable


        //setCurrentPaths(prevPath => prevPath.filter(path => path.label !== current_node[0]['label']))
    }

    return (
        <div>
            <Button className="show-routes" variant="primary" size="sm" onClick={showRoutes}>Get All Routes</Button>
         
            {markers.map(marker=>marker.lat!=undefined?
                <Marker position={[marker.lat, marker.lng]}
                icon={markerIcon} draggable={true}>
                    <Popup>{marker.label}</Popup>
                   
                    
                </Marker>
            
                :<></>
            )}
         
            <Polyline positions={currentPaths} pathOptions={{color: colorVal}}></Polyline>

            <div className="dropdown-btn">
                <label>
                    Node Labels
                <div>
                         <select className="select-menu" defaultValue="0"
                         onChange = {(e)=>showLabelRoute(e.target.value)}>
                         {menuLabels.map(node=>{
                            return (<option className='option-menu' value={node.label}>{node.label}</option>)
                            
                            
                        })}
                        </select>

                 
                                   
                </div>
                
                </label>
            </div>
            
        </div>
        
    )

}

export default Routes;



/*

  const polyline = [
    [37.26179, -80.4034],
    [37.25277, -80.43775],
    [37.21887, -80.43775],
    [37.19863, -80.39327]
  ]


   <Button style={labelButtonStyle} variant="primary" size="sm" onClick={showLabelRoute}>{marker.label}</Button>

     const labelButtonStyle = {
        position: "absolute",
        top: "60"+toString(topOffset)+"px",
        right: "30px",
        padding: "15px",
        zIndex: "400",
        borderRadius: "10px",
        backgroundColor: "rgb(199, 144, 25)",
        color: "white",
        fontWeight: "700"
    }


*/