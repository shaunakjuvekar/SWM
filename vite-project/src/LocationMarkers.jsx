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
    const [locationCosts, setLocationCosts] = useState([0])
    const [labels, setLabels] = useState([''])
    const [node_numbers, setNodes] = useState([0])
    const [node_index, setIndex] = useState(0)
    const [labelCountMatch, setLabelCountMatch] = useState(false);
    const [costInputState, setCostState] = useState(false)
    const [formValues, setFormValues] = useState({
      containerSizes:'',
      containerCosts:'',
      vehicleCapacity:''
    })
    
    const [routeButton, setRouteButton] = useState(false)
    const [viewRoutes, setViewRoutes] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(false)
    
    //debugger;
   
    //console.log(containerSizes)
    //console.log(formValues)
    //console.log("Inside Location Marker-> initial markers: ",  markers);
  
    const map = useMapEvents({
      click(event) {
  
          //console.log(event.originalEvent.srcElement.textContent)
          let text = event.originalEvent.srcElement.textContent
        
          if (text.search(/ Leaflet /)!=-1)
            {
              //console.log("Inside If condition")
              let { lat,lng } = event.latlng;  
              lat = Math.round(lat * 100000) / 100000;
              lng = Math.round(lng * 100000) / 100000;
              setMarkers((prevValue) => [...prevValue, {...{lat, lng}, id: uuidv4()}])
            }
          setIndex(node_index+1)
          setNodes((prevVal) => [...prevVal, node_index+1])
          //console.log(markers)
      },
      });
        
    

    function clickHandler(){

      //console.log(labelCountMatch)
    
      if (labels.length!=markers.length){
        //console.log(labels)
        
        setLabelCountMatch(true)
      }
      else{
        setSubmitStatus(true)
        setLabelCountMatch(false)
        let final_markers = []
        //console.log(formValues)
        
        for (let i=0;i<markers.length;i++){
          let obj = markers[i]         
          //console.log(locationCosts)
          
          obj['location_cost'] = (locationCosts[i]!=undefined && locationCosts[i]!='')?parseInt(locationCosts[i]):0
          obj['node_label'] = labels[i]??''
          obj['echelon'] = echelon.echelonKey
          obj['index'] = node_numbers[i]
          obj['facility_costs'] = formValues.containerCosts
          obj['facility_sizes'] = formValues.containerSizes
          obj['vehicle_capacity'] = formValues.vehicleCapacity

          //obj['capacity'] = parseInt(capacity)
          
          final_markers.push(obj)     
          
        }
        final_markers = final_markers.filter(marker => marker.lat!=undefined)
        console.log("Inside Click handler -> Final markers: ", final_markers)
        echelon.updateArray(final_markers)
        echelon.changeEchelon()
        props.onSubmit(final_markers)
        setMarkers([{id: uuidv4()}])
        //setSizes('')
        //setCosts('')
        setLocationCosts([0])
        setLabels([''])
        setFormValues({
          containerSizes:'',
          containerCosts:'',
          vehicleCapacity:''
        })
             
      }
     
    }

    const formHandler = (event) => {
        //console.log("markers inside form Handler: " , markers)
        event.preventDefault();
        let location_cost = event.target.elements.location_cost.value
        let label = event.target.elements.node_label.value
        //console.log(location_cost)
        setLocationCosts((prevValue)=>[...prevValue, location_cost])        
        setLabels((prevVal) => [...prevVal, label])
        //console.log(labels)
        map.closePopup();
    }

    const deleteMarker = (markerId) => {
      //setDeleteFlag(true)
      let indexToRemove = markers.findIndex(marker => marker.id == markerId)
      
      setLabels(prevLabels => prevLabels.filter((elem, index) => index !== indexToRemove))
      //setSizes(prevCosts => prevCosts.filter((elem, index) => index !== indexToRemove))
      setLocationCosts(prevCosts => prevCosts.filter((elem, index) => index !== indexToRemove))
      //setCosts(prevCosts => prevCosts.filter((elem, index) => index !== indexToRemove))
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
      //console.log("View Routes")
      setViewRoutes(true)

    }
    
    const rightFormHandler = (event) => {
      event.preventDefault();
    
    }
    

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      //console.log(name, value)
      setFormValues((prevProps) => ({
        ...prevProps,
        [name]: value
      }));
    };

return (
  <div>
  {viewRoutes==false?<div>
    {routeButton==true?<Button className="viewrouteButton" variant="primary" size="sm" onClick={routeHandler}>View Routes</Button>:<></>}
  {submitStatus==true?<Button className="calculateButton" variant="primary" size="sm" onClick={calculateRoutes}>Calculate</Button>:<></>}   


   
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
  </Modal>: <div>
     <Button className="submitButton" variant="primary" size="sm"  //disabled={labels.length!=markers.length} 
  onClick={clickHandler}>Submit: Echelon {echelon.echelonKey}
  </Button>
      <form onSubmit={rightFormHandler}>
       
      {echelon.echelonKey>1?
        <div className="text-input">
          {echelon.echelonKey==2?<p>Enter Container Sizes</p>:<p>Enter Facility Sizes</p>}
            <input name='containerSizes' value={formValues.containerSizes} placeholder=' Enter values' type='text' style={{ width: 150, height: 20 }} 
            onChange={handleInputChange}></input>
            {echelon.echelonKey==2?<p>Enter Container Costs</p>:<p>Enter Facility Costs</p>}
            <input name='containerCosts' value={formValues.containerCosts} placeholder=' Enter values' type='text' style={{ width: 150, height: 20 }} 
             onChange={handleInputChange}></input>
            <p>Enter Vehicle Capacity</p>
            <input name='vehicleCapacity' value={formValues.vehicleCapacity} placeholder=' Enter value' type='text' style={{ width: 150, height: 20 }} 
             onChange={handleInputChange}></input>
            <div className="button-div">
            <button className='text-form-button'>Submit</button> 
        </div>
        </div>:<></>}
       
      </form>
   
  </div>
  
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
           
            <div className="input-field-div">
            {echelon.echelonKey==1?`Demand:\xa0\xa0`:`Location Cost:\xa0\xa0`}
            <input id='location_cost' placeholder=' Enter value' type='text' 
                  onChange={(e) => {
                  const value = e.target.value;
                  //console.log(isNaN(+value))
                  setCostState(isNaN(+value)); // false if its a number, true if not 
                  
              }}
              ></input>
            </div>
            <div>
              </div>  
              <div className="input-field-div">
              Node Label:&nbsp;&nbsp;
              <input id='node_label' placeholder=' Enter value' type='text' required></input>
              </div>
            
              <div className="button-div"><button className='form-button' 
              disabled = {costInputState}>Submit</button>{costInputState?<span className="cost-msg">Please enter numerical cost</span>:<span></span>}</div>
              
            </form>
           </Popup>
         </Marker>:<div></div>
        
     )
   }
  </div>:<Routes></Routes>}
 
</div>
 
  )
}
   
export default LocationMarker;


/*

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
  