import React from "react";
import "./Routes.css";
import { useState } from 'react';
import APIService from "./APIService";
import { Marker, Popup } from "react-leaflet";
import redIcon from "./assets/red_icon.png";
import {Icon} from 'leaflet';
import Button from 'react-bootstrap/Button';

function Routes(){

      
    const [markers, setMarkers] = useState([])

    //console.log(markers)

    const markerIcon = new Icon({
    
        iconUrl: redIcon,
        iconAnchor: [28,15],
        iconSize: [32,32]
      })


    function showRoutes(){
        
        let routeData = async () => {
        const data = await APIService.getRoutes()
        //console.log((data))
        let filtered_data = data.filter(e=>e.route_costs.length>0)
        console.log(filtered_data)
        //setMarkers(prevMarkers => prevMarkers.map(marker => marker.route_costs.length>0));
        setMarkers(filtered_data)
    
        }
        let d = routeData();
        
    }

    return (
        <div>
            <Button className="show-routes" variant="primary" size="sm" onClick={showRoutes}>Get Routes</Button>
         
            {markers.map(marker=>marker.lat!=undefined?
                <Marker position={[marker.lat, marker.lng]}
                icon={markerIcon} draggable={true}>
                    <Popup>{marker.label}</Popup>
                </Marker>:<></>
            )}
        </div>
        
    )

}

export default Routes;

