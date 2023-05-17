import React from "react";
import './App.css';
import "leaflet/dist/leaflet.css";
import { useState, useContext, useEffect } from 'react';
import { useMapEvents } from 'react-leaflet/hooks'
import { Marker, Popup} from 'react-leaflet';
import {Icon, marker} from 'leaflet';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library

import redIcon from "./red_icon.png";
import AppContext from "./AppContext";

function LocationMarker(props){
    
    const markerIcon = new Icon({
    
        iconUrl: redIcon,
        iconAnchor: [28,15],
        iconSize: [32,32]
      })


    const echelon = useContext(AppContext);
    
    const initial_coordinates = { lat: 37.24231, lng: -80.43173}
    const [markers, setMarkers] = useState([{...initial_coordinates, id: uuidv4()}]);
    const [costs, setCosts] = useState([0])
    const [labels, setLabels] = useState([''])
    const [node_numbers, setNodes] = useState([0])
    const [node_index, setIndex] = useState(0)
    const [deleteFlag, setDeleteFlag] = useState(false)
    
    //debugger;
    console.log("Inside Location Marker-> initial markers: ",  markers);
    //console.log("Inside Location Marker-> costs: ",  costs);
    //const [text, setText] = useState(null)
  
    const map = useMapEvents({
    click(event) {

        // TO DO: Exclude Submit button too in this function and then adjust clickHandler
        console.log(event.originalEvent.srcElement.textContent)
        console.log(event.originalEvent.srcElement.textContent!='Delete')
        console.log(event.originalEvent.srcElement.textContent.search(/^Submit/)!=-1)
        if (event.originalEvent.srcElement.textContent!='Delete'){
          if (event.originalEvent.srcElement.textContent.search(/^Submit/)==-1){
            console.log("Inside If condition")
            let { lat,lng } = event.latlng;  
            lat = Math.round(lat * 100000) / 100000;
            lng = Math.round(lng * 100000) / 100000;
            setMarkers((prevValue) => [...prevValue, {...{lat, lng}, id: uuidv4()}])
          }
        }
        setIndex(node_index+1)
        setNodes((prevVal) => [...prevVal, node_index+1])
        //console.log(markers)
    },
    });

    function clickHandler(){
    
      let final_markers = []
      console.log(labels)
      console.log(costs)
      console.log("markers", markers)
      if (markers.length==1 && markers[0].lat==37.24231  && markers[0].lng==-80.43173){
        props.onSubmit([])
      }
      else{
        for (let i=0;i<markers.length;i++){
          let obj = markers[i]
          if (deleteFlag){
            obj['cost'] = parseInt(costs[i+1])
            obj['node_label'] = labels[i+1]
            obj['echelon'] = echelon.echelonKey
            obj['index'] = node_numbers[i+1]
            final_markers.push(obj)
          }
          else {
            if (i!=0){          // && i!=markers.length-1
              obj['cost'] = parseInt(costs[i])
              obj['node_label'] = labels[i]
              obj['echelon'] = echelon.echelonKey
              obj['index'] = node_numbers[i]
              final_markers.push(obj)
            }
          } 
        }
      }
     



      setMarkers([{...initial_coordinates,id: uuidv4()}])
      setCosts([0])
      setLabels([''])
      
      echelon.changeEchelon()
      
      console.log("Inside Click handler -> Final markers: ", final_markers)
      props.onSubmit(final_markers)
      
    }

    const formHandler = (event) => {
        console.log("markers inside form Handler: " , markers)
        event.preventDefault();
        const cost = event.target.elements.cost.value
        const label = event.target.elements.node_label.value
        console.log(label)
        setCosts((prevValue)=>[...prevValue, cost])
        setLabels((prevVal) => [...prevVal, label])
        console.log(labels)
        map.closePopup();
    }

    const deleteMarker = (markerId) => {
      setDeleteFlag(true)
      setMarkers(prevMarkers => prevMarkers.filter(marker => marker.id !== markerId));
    };
    

return (
  <div >
  <Button className="submitButton" variant="primary" size="sm" onClick={clickHandler} >Submit: Echelon {echelon.echelonKey}</Button>   
   {markers.map((marker, index) => 
       <Marker
         //eventHandlers={eventHandlers}
         position={[marker.lat, marker.lng]}
         icon={markerIcon} draggable={true} 
         key={marker.id}
         //onDragEnd={(event) => handleDragEnd(event, index)}
         //eventHandlers = {handleDragEnd(event, index)}
         >
           <Popup>Coordinates: {[marker.lat, ', ', marker.lng]}
            
            <div className="del-marker">
                <button  className="del-btn" onClick={() => deleteMarker(marker.id)}>Delete</button>
            </div>
            
            <form onSubmit={formHandler}>
              <input id='cost' placeholder=' Enter cost' type='text' ></input>
              <input id='node_label' placeholder=' Enter node label' type='text' ></input>
              <div className="button-div"><button className='form-button'>Submit</button></div>
              
            </form>
           </Popup>
         </Marker>

     )
   }
</div>
 
  )
}
   
export default LocationMarker;


/*


    useEffect(() => {
      console.log("Inside UseEffect() ", markers);
    }, [markers]);

    /*
    const deleteMarker = (markerId) => {
      console.log("Inside delete Marker")
      //console.log(event.target.parentNode.parentNode)
      
      const val = event.target.parentNode.parentNode.textContent
      console.log(val)
      //Coordinates: 37.22, -80.39DeleteSubmit
      let pattern1 = /:\s\d/
      const lat = parseFloat(val.substring(val.search(pattern1)+2, val.indexOf(',')));
      let pattern2 = /\dDelete/
      const long = parseFloat(val.substring(val.indexOf(',')+2,val.search(pattern2)+1));
      
      console.log(markers)
      console.log(markerId)
      //let final_markers = markers.filter((position)=> position.lat!=lat && position.lng!=long)
      let final_markers = markers.filter((m)=> m.id!=markerId)
      console.log(final_markers)
      setMarkers(final_markers)
    }
    */



    /*
   
    
      ######
      Inside Popup
       <div className="del-marker">
              <button  className="del-btn" onClick={deleteMarker}>Delete</button>
           </div>
      ######


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
  