import './App.css';
import MyMap from "./MyMap";
import Header from "./Header";
import AppContext from './AppContext';
import { useState } from 'react';





function App() {
 
  const [echelonValue, updateEchelon] = useState(1);

  const changeEchelon = () => {
    updateEchelon(echelonValue+1);
  }

  const globalObject = {
    echelonKey : echelonValue,
    updateEchelon,
    changeEchelon,
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
