import './App.css';
import MyMap from "./MyMap";
import Header from "./Header";
import APIService from "./APIService";
import AppContext from './AppContext';
import { useState } from 'react';





function App() {
 
  const [echelonValue, updateEchelon] = useState(1);
  const [markerArray, setMarkerArray] = useState([])

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

  const globalObject = {
    echelonKey : echelonValue,
    updateEchelon,
    changeEchelon,
    markerArrayKey : markerArray,
    setMarkerArray,
    updateArray,
    calculateRoutes

  };

  return (
    <AppContext.Provider value={globalObject}>
   <Header />
   <MyMap>
   </MyMap>
   </AppContext.Provider>
  )
  
}

export default App
