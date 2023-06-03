import './App.css';
import MyMap from "./MyMap";
import Header from "./Header";
import APIService from "./APIService";
import AppContext from './AppContext';
import { useState } from 'react';



function App() {
 
  const [echelonValue, updateEchelon] = useState(1);
  const [markerArray, setMarkerArray] = useState([]);
  const [flyLocation, setFlyLocation] = useState([]);

  const changeEchelon = () => {
    updateEchelon(echelonValue+1);
  }

  const updateArray = (newMarkers) => {
    console.log(newMarkers)
    let newArray = markerArray
    newArray.push(newMarkers)
    setMarkerArray(newArray)
    console.log(markerArray)
  }

  const calculateRoutes = (body) => {
    APIService.sendCompleteData(body)
    body = []
  }

  const handleFlyLocation = (e) => {
    console.log(e)
    setFlyLocation(e)
  }

  const globalObject = {
    echelonKey : echelonValue,
    updateEchelon,
    changeEchelon,
    markerArrayKey : markerArray,
    setMarkerArray,
    updateArray,
    calculateRoutes,
    flyLocation,
    handleFlyLocation

  };

  return (
    
      <AppContext.Provider value={globalObject}>
        <Header />
       
        </AppContext.Provider>
    
    
  )
  
}

export default App


/*
  <MyMap>
  </MyMap>
*/