import React from "react";
import "leaflet/dist/leaflet.css";

import LocationMarker from "./LocationMarkers";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {Icon} from 'leaflet';

import redIcon from "./red_icon.png";

function MyMap(){
  const initPosition = [37.229572, -80.4139]
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

  const markerIcon = new Icon({
    
    iconUrl: redIcon,
    iconSize: [38,38]
  })

  return (
    <MapContainer center={initPosition} zoom={13} scrollWheelZoom={true}>
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
 {console.log("Before LM!!")}
  <LocationMarker />
   
  </MapContainer>
  );
}

export default MyMap;