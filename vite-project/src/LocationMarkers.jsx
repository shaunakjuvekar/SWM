import React from "react";
import './App.css';
import "leaflet/dist/leaflet.css";
import { useState, useMemo } from 'react';
import { useMapEvents } from 'react-leaflet/hooks'
import { Marker, Popup} from 'react-leaflet';
import {Icon} from 'leaflet';
import Button from 'react-bootstrap/Button';

import redIcon from "./red_icon.png";

function LocationMarker(props){
    //const initialMarkers = [37.24, -80.43];
    //const [markers, setMarkers] = useState(initialMarkers);
    
    console.log("outside click")

    const markerIcon = new Icon({
    
        iconUrl: redIcon,
        iconAnchor: [28,15],
        iconSize: [38,38]
      })
    
    const initial_coordinates = { lat: 37.24, lng: -80.43 }
    const [markers, setMarkers] = useState([initial_coordinates]);
    const [text, setText] = useState(null)
    
    const map = useMapEvents({
    click(event) {
        let { lat,lng } = event.latlng;  
        lat = Math.round(lat * 100) / 100;
        lng = Math.round(lng * 100) / 100;
        setMarkers((prevValue) => [...prevValue, {lat, lng}])
        console.log(markers)
    },
    });

    const eventHandlers = useMemo(() => ({
      
      dragend(e) {
        console.log(e)
        text.innerHTML = e.target.getLatLng();
      },
    }), [text])

return (
  <div >
  <Button className="submitButton" variant="primary" size="sm" onClick={() => props.onSubmit(markers)} >Submit </Button>
  <React.Fragment>   
   {markers.map(marker => 
     
       <Marker
         eventHandlers={eventHandlers}
         position={[marker.lat, marker.lng]}
         icon={markerIcon} draggable={true} >
           <Popup>Coordinates: {[marker.lat, ' ', marker.lng]}</Popup>
         </Marker>
     )
   }
   </React.Fragment>
</div>
 
  )
}
   
export default LocationMarker;