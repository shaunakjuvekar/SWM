import React from "react";
import "leaflet/dist/leaflet.css";
import { useState } from 'react';
import { useMapEvents } from 'react-leaflet/hooks'
import { Marker} from 'react-leaflet';
import {Icon} from 'leaflet';

import redIcon from "./red_icon.png";

function LocationMarker(){
    //const initialMarkers = [37.24, -80.43];
    //const [markers, setMarkers] = useState(initialMarkers);
    
    console.log("outside click")

    const markerIcon = new Icon({
    
        iconUrl: redIcon,
        iconSize: [38,38]
      })
    
    
    const [position, setPosition] = useState({ latitude: 37.24, longitude: -80.43 });

    const map = useMapEvents({
    click(event) {
        const { lat, lng } = event.latlng;
        setPosition({
        latitude: lat,
        longitude: lng,
        });
    },
    });

return (
  position.latitude !== 0 ? (
    <Marker
      position={[position.latitude, position.longitude]}
      interactive={false}
      icon={markerIcon}
    />
  ) : null
)
/*
    return (
        <React.Fragment>
        {markers.map(marker => <Marker position={marker} key={marker} ></Marker>)}
      </React.Fragment>
    );
*/
  }
  
export default LocationMarker;