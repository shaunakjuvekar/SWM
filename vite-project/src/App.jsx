import './App.css';
import Header from "./Header";
import APIService from "./APIService";
import AppContext from './AppContext';
import { useState } from 'react';

function App() {
 
  const [echelonValue, updateEchelon] = useState(1);
  const [markerArray, setMarkerArray] = useState([]);
  const [flyLocation, setFlyLocation] = useState([]);
  const [nodeCoordsMap, setMap] = useState({});
  const [summaryTable, setTableState] = useState(false);

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
    setTableState(true)
    body = []
  }

  const updateCoordsMapfromCSV = (body) => {
    let tempMap = {}
    let arr = body.split('\n')
    console.log(arr)
    for (let i=1;i<arr.length;i++){
      if (arr[i]!=''){
        let lineArr = arr[i].split(',')
        tempMap[lineArr[0]] = [parseFloat(lineArr[1]), parseFloat(lineArr[2]), parseInt(lineArr[3])]

      }
      
    }
    console.log(tempMap)
    setMap(tempMap)
    
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
    nodeCoordsMapKey : nodeCoordsMap,
    updateCoordsMapfromCSV,
    summaryTableKey : summaryTable

  };

  return (
      <AppContext.Provider value={globalObject}>
        <Header />   
        </AppContext.Provider>
  )
  
}

export default App
