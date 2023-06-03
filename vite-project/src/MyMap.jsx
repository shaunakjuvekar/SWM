import React, { useRef, useContext, useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";

import LocationMarker from "./LocationMarkers";
import SearchBar from "./SearchBar";
import APIService from "./APIService";
import AppContext from "./AppContext";

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import {Icon} from 'leaflet';

//import icon from "./marker-icon-2x.png"
import icon from "./assets/location-pin.png"


function MyMap(){
  const initPosition = [37.229572, -80.4139]

  const globalObject = useContext(AppContext);
  const fly_coords_string = globalObject.flyLocation
 
  let fly_coords = []
  
  if (fly_coords_string.length!=0){
    
    fly_coords[0] = parseFloat(fly_coords_string[0])
    fly_coords[1] = parseFloat(fly_coords_string[1])
  }
  
  const mapRef = useRef();

  const markerIcon = new Icon({
    
    iconUrl: icon,
    iconAnchor: [28,15],
    iconSize: [35,35]
  })

  function onSubmit(body){
    APIService.InsertArticle(body)
    body = []
  }

  function FlyToMarker({ position }) {
    const map = useMap();
  
    useEffect(() => {
      if (position) {
        map.flyTo(position, 13, {duration: 2});
      }
    }, [position, map]);
  
    return null;
  }

  return (
    <div>
     
    <MapContainer ref={mapRef} className='leaflet-container' center={initPosition} zoom={13} scrollWheelZoom={true}>
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

  {fly_coords_string.length!=0  && <FlyToMarker position={fly_coords} />}
  
  </MapContainer>
  </div>
  );
}

export default MyMap;


/*


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