import React from "react";
import './LocationMarkers.css';
import "leaflet/dist/leaflet.css";
import { useState, useContext, useEffect } from 'react';
import { useMapEvents } from 'react-leaflet/hooks'
import { Marker, Popup} from 'react-leaflet';
import {Icon} from 'leaflet';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library

import redIcon from "./assets/red_icon.png";
import AppContext from "./AppContext";
import Routes from "./Routes"

function LocationMarker(props){
    
    const markerIcon = new Icon({
    
        iconUrl: redIcon,
        iconAnchor: [28,15],
        iconSize: [32,32]
      })


    const echelon = useContext(AppContext);
    
    //const initial_coordinates = { lat: 37.24231, lng: -80.43173}
    const [markers, setMarkers] = useState([{id: uuidv4()}]);
    const [costs, setCosts] = useState([0])
    const [labels, setLabels] = useState([''])
    const [node_numbers, setNodes] = useState([0])
    const [node_index, setIndex] = useState(0)
    const [labelCountMatch, setLabelCountMatch] = useState(false);
    const [costInputState, setCostState] = useState(false)
    const [capacity, setCapacity] = useState(100);
    const [routeButton, setRouteButton] = useState(false)
    const [viewRoutes, setViewRoutes] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(false)
    
    //debugger;
    //console.log(capacity)
    //console.log(labels)
    //console.log("Inside Location Marker-> initial markers: ",  markers);
  
    const map = useMapEvents({
    click(event) {

        //console.log(event.originalEvent.srcElement.textContent)
       
        if (event.originalEvent.srcElement.textContent!='Delete'){
          if (event.originalEvent.srcElement.textContent.search(/^Submit/)==-1){
            if (event.originalEvent.srcElement.textContent.search(/^Calculate/)==-1)
              if (event.originalEvent.srcElement.textContent.search(/^Echelon/)==-1 && 
              event.originalEvent.srcElement.textContent.search(/^[0-9]/)==-1)
                if (event.originalEvent.srcElement.textContent.search(/^View/)==-1)
            
                {
                  //console.log("Inside If condition")
                  let { lat,lng } = event.latlng;  
                  lat = Math.round(lat * 100000) / 100000;
                  lng = Math.round(lng * 100000) / 100000;
                  setMarkers((prevValue) => [...prevValue, {...{lat, lng}, id: uuidv4()}])
                }
          }
        }
        setIndex(node_index+1)
        setNodes((prevVal) => [...prevVal, node_index+1])
        //console.log(markers)
    },
    });

    function clickHandler(){

      console.log(labelCountMatch)
    
      if (labels.length!=markers.length){
        //console.log(labels)
        //console.log(markers)
        setLabelCountMatch(true)
      }
      else{
        setSubmitStatus(true)
        setLabelCountMatch(false)
        let final_markers = []
        //console.log("cost array", costs)
        //console.log("label array", labels)
        for (let i=0;i<markers.length;i++){
          let obj = markers[i]         
          
          if (costs[i]==undefined || costs[i]==''){
            obj['cost'] = 0
          }
          else{
            obj['cost'] = parseInt(costs[i])
          }
          obj['node_label'] = labels[i]??''
          obj['echelon'] = echelon.echelonKey
          obj['index'] = node_numbers[i]
          obj['capacity'] = parseInt(capacity)
          final_markers.push(obj)     
          
        }
        final_markers = final_markers.filter(marker => marker.lat!=undefined)
        console.log("Inside Click handler -> Final markers: ", final_markers)
        echelon.updateArray(final_markers)
        echelon.changeEchelon()
        props.onSubmit(final_markers)
        setMarkers([{id: uuidv4()}])
        setCosts([0])
        setLabels([''])
             
      }
     
    }

    const formHandler = (event) => {
        console.log("markers inside form Handler: " , markers)
        event.preventDefault();
        let cost = event.target.elements.cost.value
        let label = event.target.elements.node_label.value
        setCosts((prevValue)=>[...prevValue, cost])
        setLabels((prevVal) => [...prevVal, label])
        //console.log(labels)
        map.closePopup();
    }

    const deleteMarker = (markerId) => {
      //setDeleteFlag(true)
      let indexToRemove = markers.findIndex(marker => marker.id == markerId)
      
      setLabels(prevLabels => prevLabels.filter((elem, index) => index !== indexToRemove))
      setCosts(prevCosts => prevCosts.filter((elem, index) => index !== indexToRemove))
      setMarkers(prevMarkers => prevMarkers.filter(marker => marker.id !== markerId));
      
      
    };

    const calculateRoutes = () => {
      //console.log(echelon.markerArrayKey)
      echelon.calculateRoutes(echelon.markerArrayKey)
      setRouteButton(true)
      
    }

    const handleClose = () => {
      setLabelCountMatch(false)
    }

    const routeHandler = () => {
      console.log("View Routes")
      setViewRoutes(true)

    }

return (
  <div>
  {viewRoutes==false?<div>
    {routeButton==true?<Button className="viewrouteButton" variant="primary" size="sm" onClick={routeHandler}>View Routes</Button>:<></>}
  {submitStatus==true?<Button className="calculateButton" variant="primary" size="sm" onClick={calculateRoutes}>Calculate</Button>:<></>}   


    <div className="dropdown-btn">
      <label>
        Echelon Capacity
        <div>
          <select className="select-menu" defaultValue="0"
          onChange = {e => setCapacity(e.target.value)}>
        
            <option className='option-menu' value="100" >100</option>

            <option className='option-menu' value="300">300</option>

            <option className='option-menu' value="500">500</option>

          </select>
      </div>
      
      </label>
      </div>

  {labelCountMatch?
  <Modal className='modal' show={true} onHide={handleClose}>
  <Modal.Header>
    <Modal.Title>Please enter node labels for every marker!</Modal.Title>
  </Modal.Header>
  <Modal.Footer>
          <Button className='modal-btn' variant="secondary" onClick={handleClose}>
            Close
          </Button>
  </Modal.Footer>
  </Modal>:  <Button className="submitButton" variant="primary" size="sm"  //disabled={labels.length!=markers.length} 
  onClick={clickHandler}>Submit: Echelon {echelon.echelonKey}
  </Button>   
}
 
   {markers.map((marker, index) => 
       marker.lat!=undefined?
       <Marker
         position={[marker.lat, marker.lng]}
         icon={markerIcon} draggable={true} 
         key={marker.id}>
           <Popup>Coordinates: {[marker.lat, ', ', marker.lng]}
            
            <div className="del-marker">
                <button  className="del-btn" onClick={() => deleteMarker(marker.id)}>Delete</button>
            </div>
            
            <form onSubmit={formHandler} >
              <input id='cost' placeholder=' Enter cost' type='text' 
                  onChange={(e) => {
                  const value = e.target.value;
                  //console.log(isNaN(+value))
                  setCostState(isNaN(+value)); // false if its a number, true if not 
                  
              }}
              ></input>
              <input id='node_label' placeholder=' Enter node label' type='text' required></input>
              <div className="button-div"><button className='form-button' 
              disabled = {costInputState}>Submit</button>{costInputState?<span className="cost-msg">Please enter numerical cost</span>:<span></span>}</div>
              
            </form>
           </Popup>
         </Marker>:<div>{console.log("Else condition")}</div>
        
     )
   }
  </div>:<Routes></Routes>}
 
</div>
 
  )
}
   
export default LocationMarker;


/*

  <Dropdown className="dropdown-btn">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action 1</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Action 2</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Action 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

{submitMessage==true?<div>Please fill all input label fields!</div>:<></>}

   {isOpen && (
             <div >
              <div >
                This is the content of the pop-up.
              </div>
              <button onClick={() => setIsOpen(false)}>
                Close Pop-up
              </button>
             </div>
            )} 

  
  
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
  