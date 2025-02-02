import React, {useContext, useEffect} from "react";
import "./Routes.css";
import { useState } from 'react';
import APIService from "./APIService";
import AppContext from "./AppContext";
import { Marker, Popup, Polyline, useMapEvents, useMap } from "react-leaflet";
import facility1_icon from "./assets/facility_1.png";
import facility2_icon from "./assets/facility_2.png";
import house from "./assets/home.png";
import L from 'leaflet';


import {Icon} from 'leaflet';
import Button from 'react-bootstrap/Button';
//import { ColorRing } from  'react-loader-spinner'

function Routes(){

      
    const [markers, setMarkers] = useState([])
   
    const [menuLabels, setMenuLabels] = useState([])
    const [currentNodes, setCurrentNodes] = useState([])
    const [currentPaths, setCurrentPaths] = useState([])
    const [echelonLevels, setEchelonLevels] = useState([])
    const [popupState, setPopupState] = useState(false)
   
    //console.log(markers)
    
    const flyCoords = useContext(AppContext);
    const coordsMap = flyCoords.nodeCoordsMapKey
    const allNodes = Object.keys(coordsMap)

    const colorArray = ['blue', 'brown', 'red', 'purple', 'black', 'orange', 'fuchsia', 'maroon', 'DarkSlateGray','DarkTurquoise','SlateBlue','LimeGreen','gray' ] 
   
    let filtered_data = []
    let echelon_levels = []

    const imgStyles = {
        height: 20,
        width: 30
    }

    const facilityIcon_1 = new Icon({

    iconUrl: facility1_icon,
    iconAnchor: [28,15],
    iconSize: [28,28]
    })

    const facilityIcon_2 = new Icon({

    iconUrl: facility2_icon,
    iconAnchor: [28,15],
    iconSize: [42,42]
    })

    const houseIcon = new Icon({

    iconUrl: house,
    iconAnchor: [28,15],
    iconSize: [28,28]
    })

    const map = useMap();
    useEffect(() => {
    //console.log("PopupLayer triggered")
    if (popupState){
        markers.map(marker=>{
            var popup = L.popup()
                        .setLatLng([marker.lat, marker.lng])
                        .setContent(marker.label)
                        .addTo(map);
        })
    }
    else{
        markers.map(marker=>{
            var popup = L.popup()
                        .setLatLng([marker.lat, marker.lng])
                        .setContent(marker.label)
                        .remove(map);
        })
    }
    }, [popupState])



    function showFacilities(){
        
        let routeData = async () => {
        const data = await APIService.getRoutes()
        await new Promise(r => setTimeout(r, 500));
        console.log("data: ", data)
        
        let echelonSet = new Set()
        for (let i=0;i<data.length;i++){
            echelonSet.add(parseInt(data[i]['echelon']))
        }

        echelon_levels = [...echelonSet].filter(e=>e!=1)

        setEchelonLevels(echelon_levels)
       
        filtered_data = data.filter(e=>e.route_costs.length>0)
        console.log("filtered_data: ", filtered_data)
       
        flyCoords.handleFlyLocation([filtered_data[0]['lat'],filtered_data[0]['lng']])
        
        setCurrentNodes(filtered_data)
        setMenuLabels(filtered_data)
        //polylines = filtered_data.map(node=>[parseFloat(node.lat), parseFloat(node.lng)])
        setCurrentPaths([])
        //console.log("Polylines:" , [polylines])
        setMarkers(filtered_data)
        console.log("Markers: ", markers)
    
        }
        let d = routeData();
    }

    function showNodesAndRoutes(currentNodes){
        let allMarkers = []
        let allPaths = []
        console.log(currentNodes)
        for (let i=0;i<currentNodes.length;i++){
            let current_node = currentNodes[i]
          
            current_node['routes'] = current_node['routes'].replace(/'/g,"\"")
            //console.log(current_node['routes'])
            let routeNodes = JSON.parse(current_node['routes'])
            console.log(routeNodes)
            if (!allMarkers.includes(current_node.label)){
                allMarkers.push(current_node.label)
            }
            let newPathMarkers = []
            for (let j=0;j<routeNodes.length;j++){
                
                let tempArr = []
                let addEndRoute = false
                if (routeNodes[j].length>1){
                    //console.log("add at end")
                    addEndRoute = true
                }
                tempArr.push(current_node.label)
                for (let k=0;k<routeNodes[j].length;k++){
                    tempArr.push(routeNodes[j][k])
                    if (!allMarkers.includes(routeNodes[j][k])){
                        allMarkers.push(routeNodes[j][k])
                    }
                }
                if (addEndRoute){
                    tempArr.push(current_node.label)
                }
                newPathMarkers.push(tempArr)
            }
            console.log("NewPathMarkers: ", newPathMarkers)

            let newPathCoords = []
            for (let i=0;i<newPathMarkers.length;i++){
                let pathArr = []
                for (let j=0;j<newPathMarkers[i].length;j++){
                    let node = newPathMarkers[i][j]
                    let tempArr = []
                    console.log("Coords Map: " , coordsMap)
                    if (node in coordsMap){
                        for (let k=0;k<2;k++){
                            tempArr.push(coordsMap[node][k])
                        }
                        
                    }
                    pathArr.push(tempArr)
                  
                }
                newPathCoords.push(pathArr)
            }
            console.log("newPathCoords: " , newPathCoords)
            
            routeNodes = [...routeNodes, [current_node.label]]
            console.log(routeNodes)
            let allCurrentNodes = []
            routeNodes.map(arr => {
                for (let i=0;i<arr.length;i++){
                    allCurrentNodes.push(arr[i])
                }
            })
            console.log(allCurrentNodes)
            allPaths.push(newPathCoords)
        }
        let newMarkers = []
        //console.log("allMarkers:" , allMarkers)
        allNodes.map(node1=>{
            let obj={}
            for (let j=0;j<allMarkers.length;j++){
                if (node1==allMarkers[j]){
                    obj['label'] = allMarkers[j]
                    obj['lat'] = coordsMap[node1][0]
                    obj['lng'] = coordsMap[node1][1]
                    obj['echelon'] = coordsMap[node1][2]
                    newMarkers.push(obj)
                }
            }
        })
        console.log(allPaths)
        setCurrentPaths(allPaths)
        setMarkers(newMarkers)
    }

    function showLabelRoute(e){
        let current_node = currentNodes.filter(path => path['label']==e)
        let currentLabelNodes = JSON.parse(current_node[0]['routes'])
        let newPathMarkers = []
        for (let i=0;i<currentLabelNodes.length;i++){
            
            let tempArr = []
            let addEndRoute = false
            if (currentLabelNodes[i].length>1){
                //console.log("add at end")
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
        //console.log("NewPathMarkers: ", newPathMarkers)

        let newPathCoords = []
        for (let i=0;i<newPathMarkers.length;i++){
            let pathArr = []
            for (let j=0;j<newPathMarkers[i].length;j++){
                let node = newPathMarkers[i][j]
                let tempArr = []
                if (node in coordsMap){
                    for (let k=0;k<2;k++){
                        tempArr.push(coordsMap[node][k])
                    }
                    
                }
                pathArr.push(tempArr)
              
            }
            newPathCoords.push(pathArr)
        }
        //console.log("newPathCoords: " , newPathCoords)

        setCurrentPaths(newPathCoords)

        currentLabelNodes = [...currentLabelNodes, [current_node[0].label]]
        //console.log(currentLabelNodes)
        let allCurrentNodes = []
        currentLabelNodes.map(arr => {
            for (let i=0;i<arr.length;i++){
                allCurrentNodes.push(arr[i])
            }
        })
        //console.log(allCurrentNodes)
        let newMarkers = []
        allNodes.map(node1=>{
            let obj={}
            for (let j=0;j<allCurrentNodes.length;j++){
                if (node1==allCurrentNodes[j]){
                    obj['label'] = allCurrentNodes[j]
                    obj['lat'] = coordsMap[node1][0]
                    obj['lng'] = coordsMap[node1][1]
                    obj['echelon'] = coordsMap[node1][2]
                    newMarkers.push(obj)
                }
            }
        })
        setMarkers(newMarkers)
    }

    function showAllRoutes(){       
        showNodesAndRoutes(currentNodes)
    }

    function showEchelonRoutes(e){
        let selectedEchelonNodes = currentNodes.filter(node=>parseInt(node['echelon'])==e)
        showNodesAndRoutes(selectedEchelonNodes)
    }

    return (
        <div>
          
            <Button className="show-facilities" size='sm' onClick={showFacilities}>Show All Facilities</Button>
            <Button className="show-routes" size='sm' onClick={showAllRoutes}>Show All Routes</Button>
            <Button className="toggle-popups" size='sm' onClick={() => setPopupState((prevState) => !prevState)}>Toggle Popups</Button>

            

            {markers.map(marker=>marker.lat!=undefined?
                marker['echelon']=='2'?
                <Marker position={[marker.lat, marker.lng]}
               draggable={true}
               icon = {facilityIcon_1}>
                    <Popup >{marker.label}</Popup>
  
                </Marker>
                :marker['echelon']=='3'?
                <Marker position={[marker.lat, marker.lng]}
                draggable={true}
                icon = {facilityIcon_2}>
                     <Popup >{marker.label}</Popup>
                 </Marker>
                 :
                 <Marker position={[marker.lat, marker.lng]}
                 draggable={true}
                 icon = {houseIcon}>
                      <Popup >{marker.label}</Popup>
                  </Marker>
                :<></>
            )}
         
            <div className="dropdown-button">
                <label>
                    Facility Level Routes
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

            <div className="echelon-button">
                <label>
                    Echelon Level Routes
                <div>
                         <select className="select-menu" defaultValue="0"
                         onChange = {(e)=>showEchelonRoutes(e.target.value)}>
                         {echelonLevels.map(level=>{       
                            return (<option className='option-menu' value={level}>Level {level}</option>)
                            
                        })}
                        </select>      
                                   
                </div>
                
                </label>
            </div>


            <div className="legend">
                <div className="legend-heading">
                LEGEND
                </div>

                <div>
                <img src={house} style={{
                    height: 20,
                    width: 30,
                    // marginLeft: -9
                }}></img>
                 &nbsp;&nbsp;- Echelon 1 node
                </div>


                <div style={{marginTop: 5}}>
                <img src={facility1_icon} style={imgStyles}></img>
                &nbsp;&nbsp;- Echelon 2 facility
                </div>
                
               <div style={{marginTop: 5}}>
               <img src={facility2_icon} style={imgStyles}></img>
               &nbsp;&nbsp;- Echelon 3 facility
                </div>

            
            </div>
s
            {currentPaths.map((polyline,index)=>polyline!=undefined?
                <Polyline positions={polyline} pathOptions={{color: colorArray[index%colorArray.length]}}></Polyline>
            :<></>)}
            
        </div>
        
    )
}

export default Routes;

