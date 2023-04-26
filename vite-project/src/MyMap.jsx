import React from "react";
import "leaflet/dist/leaflet.css";



import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {Icon} from 'leaflet';

import redIcon from "./red_icon.png";

//import icon from 'leaflet/dist/images/marker-icon.png';
//import iconShadow from 'leaflet/dist/images/marker-shadow.png';


function MyMap(){
  const markers = [
    {
      geocode: [37.2298, -80.4139],
      popupMsg: "First marker"
    },
    {
      geocode: [37.21, -80.42],
      popupMsg: "Second marker"
    }
  ]
/*
  // Default Icon format
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });
  
  L.Marker.prototype.options.icon = DefaultIcon;
*/

  // Custom Icon format

  const markerIcon = new Icon({
    
    iconUrl: redIcon,
    iconSize: [38,38]
  })

  return (
    <MapContainer center={[37.229572, -80.4139]} zoom={13} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />


    {markers.map(marker => {

      {console.log("Test!!")}
      return (
      <Marker position={marker.geocode} key={marker.geocode} icon={markerIcon}>
        <Popup>My Location</Popup>
      </Marker>)
      
    })}
   
  </MapContainer>
  );
}

export default MyMap;