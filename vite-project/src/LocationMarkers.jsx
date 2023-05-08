import React from "react";
import './App.css';
import "leaflet/dist/leaflet.css";
import { useState, useMemo } from 'react';
import { useMapEvents } from 'react-leaflet/hooks'
import { Marker, Popup} from 'react-leaflet';
import {Icon, marker} from 'leaflet';
import Button from 'react-bootstrap/Button';

import redIcon from "./red_icon.png";

function LocationMarker(props){
    
    const markerIcon = new Icon({
    
        iconUrl: redIcon,
        iconAnchor: [28,15],
        iconSize: [32,32]
      })
    
    
    const initial_coordinates = { lat: 37.24, lng: -80.43}
    const [markers, setMarkers] = useState([initial_coordinates]);
    const [costs, setCosts] = useState([0])

    markers

    console.log("Inside Location Marker-> initial markers: ",  markers);
    console.log("Inside Location Marker-> costs: ",  costs);
    //const [text, setText] = useState(null)
    
    const map = useMapEvents({
    click(event) {
        let { lat,lng } = event.latlng;  
        lat = Math.round(lat * 100) / 100;
        lng = Math.round(lng * 100) / 100;
        setMarkers((prevValue) => [...prevValue, {lat, lng}])
        //console.log(markers)
    },
    });

    function clickHandler(){
    
      console.log("Inside Click handler -> Check markers: ", markers)
      let final_markers = []
      for (let i=0;i<markers.length;i++){
        let obj = markers[i]
        if (i!=0 && i!=markers.length-1){
          console.log('inside condition')
          obj['cost'] = parseInt(costs[i])
          final_markers.push(obj)
        }
      }
      setMarkers([{lat: 37.24, lng: -80.43}])
      setCosts([0])
      
      console.log("Inside Click handler -> Final markers: ", final_markers)

      props.onSubmit(final_markers)
      
    }

   
    const costHandler = (event) => {
        console.log("markers inside Cost handler: " , markers)
        event.preventDefault();
        
        //console.log(event.target.elements.cost.value)
        const cost = event.target.elements.cost.value
        console.log("cost: " , cost)
        setCosts((prevValue)=>[...prevValue, cost])
        //setMarkers((prevValue) => [...prevValue, {lat, lng, cost}])
        
    }
      

return (
  <div >
  <Button className="submitButton" variant="primary" size="sm" onClick={clickHandler} >Submit </Button>
  <React.Fragment>   
   {markers.map((marker, index) => 
     
       <Marker
         //eventHandlers={eventHandlers}
         position={[marker.lat, marker.lng]}
         icon={markerIcon} draggable={true} 
         key={[marker.lat, marker.lng]}
         //onDragEnd={(event) => handleDragEnd(event, index)}
         //eventHandlers = {handleDragEnd(event, index)}
         >
           <Popup>Coordinates: {[marker.lat, ' ', marker.lng]}
            <form onSubmit={costHandler}>
              <input id='cost' placeholder='Enter cost' type='text' ></input>
              <button id='form-button'>Submit</button>
            </form>
           </Popup>
         </Marker>
     )
   }
   </React.Fragment>
</div>
 
  )
}
   
export default LocationMarker;


/*
    const eventHandlers = useMemo(() => ({
      
      dragend(e) {
        console.log(e)
        console.log(e.target.getLatLng())
        text.innerHTML = e.target.getLatLng();
        
      },
    }), [text])

      function handleDragEnd(event, index) {
      console.log("event:" , event)
      const marker = event.target;
      const position = marker.getLatLng();
      console.log("position:", position)
        
      setMarkers(prevMarkers => {
        const newMarkers = [...prevMarkers];
        newMarkers[index] = position;
        return newMarkers;
      });
    }
*/
  