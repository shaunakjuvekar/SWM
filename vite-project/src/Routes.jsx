import React, {useContext} from "react";
import "./Routes.css";
import { useState } from 'react';
import APIService from "./APIService";
import AppContext from "./AppContext";
import { Marker, Popup, Polyline, useMapEvents } from "react-leaflet";
import facility1_icon from "./assets/facility_1.png";
import facility2_icon from "./assets/facility_2.png";
import redIcon from "./assets/red_icon.png";
import house from "./assets/home.png";

import {Icon} from 'leaflet';
import Button from 'react-bootstrap/Button';

function Routes(){

      
    const [markers, setMarkers] = useState([])
    const [allNodes, setNodes] = useState([])
    const [menuLabels, setMenuLabels] = useState([])
    const [currentNodes, setCurrentNodes] = useState([])
    const [currentPaths, setCurrentPaths] = useState([])
    const [coordsMap, setMap] = useState({})

    //console.log(currentPaths)
    //console.log(markers)
    

    const flyCoords = useContext(AppContext);


    const colorArray = ['fuchsia','brown', 'red','blue', 'purple', 'orange', 'maroon', 'black', 'DarkSlateGray','DarkTurquoise','SlateBlue','LimeGreen','gray' ] 
   
    let filtered_data = []
    let polylines = []
    

    const markerIcon = new Icon({
    
        iconUrl: redIcon,
        iconAnchor: [28,15],
        iconSize: [32,32]
      })

      const facilityIcon_1 = new Icon({
    
        iconUrl: facility1_icon,
        iconAnchor: [28,15],
        iconSize: [32,32]
      })

      const facilityIcon_2 = new Icon({
    
        iconUrl: facility2_icon,
        iconAnchor: [28,15],
        iconSize: [32,32]
      })

      const houseIcon = new Icon({
    
        iconUrl: house,
        iconAnchor: [28,15],
        iconSize: [32,32]
      })



    function showFacilities(){
        
        let routeData = async () => {
        const data = await APIService.getRoutes()
        setNodes(data)
        console.log("All Nodes", allNodes)
        
        let tempDict = {}
        for (let i=0;i<data.length;i++){
            tempDict[data[i].label] = [parseFloat(data[i].lat), parseFloat(data[i].lng)]
        }

        //console.log("tempDict", tempDict)
        setMap(tempDict)
        filtered_data = data.filter(e=>e.route_costs.length>0)
       
        flyCoords.handleFlyLocation([filtered_data[0]['lat'],filtered_data[0]['lng']])
        


        setCurrentNodes(filtered_data)
        setMenuLabels(filtered_data)
        //polylines = filtered_data.map(node=>[parseFloat(node.lat), parseFloat(node.lng)])
        setCurrentPaths([])
        //console.log("Polylines:" , [polylines])
        //console.log("Markers: ", filtered_data)
        setMarkers(filtered_data)
    
        }
        let d = routeData();
    }

    function showLabelRoute(e){
        //setColor(colorArray[Math.floor(Math.random()*colorArray.length)])
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
                if (node1.label==allCurrentNodes[j]){
                    obj['label'] = allCurrentNodes[j]
                    obj['lat'] = node1['lat']
                    obj['lng'] = node1['lng']
                    obj['echelon'] = node1['echelon']
                    newMarkers.push(obj)
                }
            }
        })
        setMarkers(newMarkers)
    }

    function showAllRoutes(){

        let allMarkers = []
        let allPaths = []
        //console.log(currentNodes)
        for (let i=0;i<currentNodes.length;i++){
            let current_node = currentNodes[i]
            let routeNodes = JSON.parse(current_node['routes'])
           
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
            
            routeNodes = [...routeNodes, [current_node.label]]
            //console.log(currentLabelNodes)
            let allCurrentNodes = []
            routeNodes.map(arr => {
                for (let i=0;i<arr.length;i++){
                    allCurrentNodes.push(arr[i])
                }
            })
            //console.log(allCurrentNodes)
        
            allPaths.push(newPathCoords)
        }
        let newMarkers = []
        allNodes.map(node1=>{
            let obj={}
            for (let j=0;j<allMarkers.length;j++){
                if (node1.label==allMarkers[j]){
                    obj['label'] = allMarkers[j]
                    obj['lat'] = node1['lat']
                    obj['lng'] = node1['lng']
                    obj['echelon'] = node1['echelon']
                    newMarkers.push(obj)
                }
            }
        })
        setCurrentPaths(allPaths)
        setMarkers(newMarkers)
    }

    return (
        <div>
            <Button className="show-facilities" variant="primary" size="sm" onClick={showFacilities}>Show All Facilities</Button>
            <Button className="show-routes" variant="primary" size="sm" onClick={showAllRoutes}>Show All Routes</Button>
         
            {markers.map(marker=>marker.lat!=undefined?
                marker['echelon']=='2'?
                <Marker position={[marker.lat, marker.lng]}
               draggable={true}
               icon = {facilityIcon_1}>
                    <Popup>{marker.label}</Popup>
  
                </Marker>
                :marker['echelon']=='3'?
                <Marker position={[marker.lat, marker.lng]}
                draggable={true}
                icon = {facilityIcon_2}>
                     <Popup>{marker.label}</Popup>
                 </Marker>
                 :
                 <Marker position={[marker.lat, marker.lng]}
                 draggable={true}
                 icon = {houseIcon}>
                      <Popup>{marker.label}</Popup>
                  </Marker>
                :<></>
            )}
         
            <div className="dropdown-btn">
                <label>
                    Facility Labels
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
            {currentPaths.map((polyline,index)=>polyline!=undefined?
                <Polyline positions={polyline} pathOptions={{color: colorArray[index%colorArray.length]}}></Polyline>
            :<></>)}
            
        </div>
        
    )

}

export default Routes;



/*

icon = {marker['echelon']=='1'?{facilityIcon}:{houseIcon}}

  <Polyline positions={currentPaths} pathOptions={{color: colorVal}}></Polyline> 

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

[
    [
        [
            37.21573,
            -80.44873
        ],
        [
            37.21901,
            -80.44788
        ]
    ],
    [
        [
            37.21573,
            -80.44873
        ],
        [
            37.20437,
            -80.45304
        ]
    ],
    [
        [
            37.21573,
            -80.44873
        ],
        [
            37.23418,
            -80.42951
        ],
        [
            37.20807,
            -80.47948
        ],
        [
            37.21573,
            -80.44873
        ]
    ]
]

$$$$$$$$$$$$$$$$$$$$$$$$

[
    [
        37.24757,
        -80.41028
    ],
    [
        37.23076,
        -80.39036
    ]
]
*/