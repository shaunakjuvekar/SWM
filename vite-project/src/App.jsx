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
  const [nodeCoordsMap, setMap] = useState({})

  const changeEchelon = () => {
    updateEchelon(echelonValue+1);
  }

  const updateArray = (newMarkers) => {
   
    let newArray = markerArray
    newArray.push(newMarkers)
    setMarkerArray(newArray)
  
  }

  const calculateRoutes = (body) => {
    let tempMap = {}
    for (let i=0;i<body.length;i++){
      for (let j=0;j<body[i].length;j++){
        tempMap[body[i][j]['node_label']] = [parseFloat(body[i][j].lat), parseFloat(body[i][j].lng), 
        parseFloat(body[i][j].echelon)]
      }
    }
    setMap(tempMap)
    APIService.sendCompleteData(body)
    body = []
  }

  const handleFlyLocation = (e) => {
    //console.log(e)
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
    handleFlyLocation,
    nodeCoordsMapKey : nodeCoordsMap

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