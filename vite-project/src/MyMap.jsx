import React from "react";
import "leaflet/dist/leaflet.css";

import LocationMarker from "./LocationMarkers";
import SearchBar from "./SearchBar";
import APIService from "./APIService";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {Icon} from 'leaflet';

import icon from "./marker-icon-2x.png"



function MyMap(){
  const initPosition = [37.229572, -80.4139]

  const markerIcon = new Icon({
    
    iconUrl: icon,
    iconAnchor: [28,15],
    iconSize: [30,30]
  })

  function onSubmit(body){
    APIService.InsertArticle(body)
    body = []
  }
  
  return (
    <div>
     
    <MapContainer className='leaflet-container' center={initPosition} zoom={13} scrollWheelZoom={true}>
    <SearchBar />
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    
    <Marker     
         position={[initPosition[0], initPosition[1]]}
         icon={markerIcon} draggable={true}>
          <Popup>Initial Marker</Popup>
    </Marker>
  <LocationMarker onSubmit={onSubmit}/>
  
  </MapContainer>
  </div>
  );
}

export default MyMap;


/*

  const polyline = [
    [37.26179, -80.4034],
    [37.25277, -80.43775],
    [37.21887, -80.43775],
    [37.19863, -80.39327]
  ]


  <Polyline positions={polyline}></Polyline>

  const markers = [
    {
      geocode: [37.2298, -80.4139],
      popupMsg: "First marker"
    } 
  ]
  const markerIcon = new Icon({
    
    iconUrl: redIcon,
    iconSize: [28,28]
  })

*/