import React from "react";
import "leaflet/dist/leaflet.css";

import LocationMarker from "./LocationMarkers";
import SearchBar from "./SearchBar";
import APIService from "./APIService";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {Icon} from 'leaflet';

import redIcon from "./red_icon.png";



function MyMap(){
  const initPosition = [37.229572, -80.4139]
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

  function onSubmit(body){
    console.log("called from child")
    console.log(body)
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


  
 {console.log("Before LM!!")}
 
  <LocationMarker onSubmit={onSubmit}/>
  
  </MapContainer>
  </div>
  );
}

export default MyMap;