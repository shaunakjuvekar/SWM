import React, { useEffect, useRef, useState, useContext } from 'react';
import APIService from "./APIService";
// import AppContext from "./AppContext";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "./Routes.css";


const MapComponent = () => {
    const mapRef = useRef(null);
    const directionsRef = useRef(null);
    const bingKey = import.meta.env.VITE_BING_KEY

    const [routePoints, setRoutePoints] = useState([])

    const [finalRouteMap, setRouteMap] = useState(null);
    const [dropdownRoutes, setDropdownRoutes] = useState([]);

    function clickHandler(e){
      let val = e.target.innerHTML
      let routeKey = parseInt(val.match(/\d+/)[0])
  
      let DM = finalRouteMap.get(routeKey);
      console.log(DM)
      DM.calculateDirections();

    }
      

    let filtered_data = []

    function getCoords(nodeName, coordsList) {
        for (let coord of coordsList) {
          if (coord["Node_Name"] === nodeName) {
            return [coord["Latitude"], coord["Longitude"]];
          }
        }
        return null;
      }
      
      function generateOutput(markers, allCoords) {
        const output = [];
        markers.forEach(marker => {
          const label = marker.label;
          const baseCoords = getCoords(label, allCoords);
          let routes = []
          if (marker.routes) {
            try {
                // Replace single quotes with double quotes for valid JSON parsing
                routes = JSON.parse(marker.routes.replace(/'/g, '"'));
              } catch (error) {
                console.error(`Error parsing routes for marker ${label}:`, error);
              }
            routes.forEach(route => {
              const routeDict = { [label]: baseCoords };
              route.forEach(node => {
                routeDict[node] = getCoords(node, allCoords);
              });
              output.push(routeDict);
            });
          }
        });
        return output;
      }

    useEffect(() => {
        let routeData = async () => {

            // Get all activated nodes
            const data = await APIService.getRoutes()
            console.log(data)
            await new Promise(r => setTimeout(r, 1000));
            filtered_data = data.filter(e=>e.route_costs.length>0)
           
            // setMarkers(filtered_data)
            // console.log("filtered_data: ", filtered_data)

            // Get all node coordinates
            let allNodes = []
            allNodes = await APIService.getAllCoordinates()
            await new Promise(r => setTimeout(r, 1000));
            // console.log("allNodes: ", allNodes)

            const output = generateOutput(filtered_data, allNodes);
          
            setRoutePoints(output)

            }
            const callAPI = routeData();
    }, [])
    
    useEffect(() => {
      const loadMap = () => {
        const map = new Microsoft.Maps.Map(mapRef.current, {
          center: new Microsoft.Maps.Location(37.229572, -80.4139),
          zoom: 12,
          showSearchBar: true,
        });
  
        // Load Directions module
        Microsoft.Maps.loadModule('Microsoft.Maps.Directions', () => {
  
        
        let routeMap = new Map();
        let routeLabels = []
        for (let i =0;i<routePoints.length;i++) {

          const directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);
          directionsRef.current = directionsManager;
  
          directionsManager.setRequestOptions({ routeMode: Microsoft.Maps.Directions.RouteMode.truck });
          
          // console.log(routePoints)
          let cnt = 1

          // Directions Manager setup
          directionsManager.setRenderOptions({
            waypointPushpinOptions: {
                showInputPanel: true,
                visible: false
                
            }
          });

            let truckRoute = routePoints[i]
            routeLabels.push(i)
            // console.log("truckRoute: ", truckRoute)
            
              
              // Add waypoints
              for (let key in truckRoute) {
                if (truckRoute.hasOwnProperty(key)) {
                  let location = new Microsoft.Maps.Location(truckRoute[key][0], truckRoute[key][1]);

                  // Create a waypoint with custom text
                  let waypoint = new Microsoft.Maps.Directions.Waypoint({
                    address: key,
                    location: location
                  });

                    directionsManager.addWaypoint(waypoint);
                     // Customize the pushpin with incrementing number
                     const pushpin = new Microsoft.Maps.Pushpin(location, {
                        title: key,
                        text: cnt.toString(), 
                        draggable: true

                    });
                    map.entities.push(pushpin);
                    cnt += 1;  
                }
            }
            routeMap.set(i, directionsManager)
          }
          console.log(routeMap)
          setRouteMap(routeMap);
          setDropdownRoutes(routeLabels)
        });
  
      };
  
      // Load the Bing Maps API script dynamically
      if (window.Microsoft && window.Microsoft.Maps) {
        loadMap();
      } else {
        const script = document.createElement('script');
        script.src = `https://www.bing.com/api/maps/mapcontrol?callback=loadMap&key=${bingKey}`;
        script.async = true;
        script.defer = true;
        window.loadMap = loadMap;
        document.head.appendChild(script);
      }
  
      // Cleanup when component is unmounted
      return () => {
        if (mapRef.current) {
          mapRef.current.innerHTML = '';
        }
      };
    }, [routePoints, bingKey]);

    return (
        
        <div style={{ position: 'relative' }}>
          
                <DropdownButton id="karnal-routes" title="Dropdown button" onClick={clickHandler}>
                    {
                      
                      dropdownRoutes.length > 0 ? dropdownRoutes.map((route_number) => {
                        return (<Dropdown.Item href="#/action-1">Route {route_number}</Dropdown.Item>)
                      } ) : <></>
                    }
                </DropdownButton>
                <div ref={mapRef} id="myMap" style={{ width: '100%', height: '780px' }}></div>  
        </div>
    );
};

export default MapComponent;

//height: '780px'




        // Load Search module for reverse geocoding
        // Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
        //   const searchManager = new Microsoft.Maps.Search.SearchManager(map);
        //   const reverseGeocodeRequestOptions = {
        //     location: new Microsoft.Maps.Location(29.6855555, 76.9988888), // Example location for reverse geocoding
        //     callback: function (answer, userData) {
        //       // Set view and push a pin to the map
        //       map.setView({ bounds: answer.bestView });
        //       const pushpin = new Microsoft.Maps.Pushpin(reverseGeocodeRequestOptions.location);
        //       map.entities.push(pushpin);
  
        //       // Display the formatted address in the printoutPanel
        //       document.getElementById('printoutPanel').innerHTML = answer.address.formattedAddress;
        //     },
        //   };
        //   searchManager.reverseGeocode(reverseGeocodeRequestOptions);
        // });