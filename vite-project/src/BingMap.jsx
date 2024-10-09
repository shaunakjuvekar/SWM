import React, { useEffect, useRef, useState, useContext } from 'react';
import APIService from "./APIService";
import AppContext from "./AppContext";



const MapComponent = () => {
    const mapRef = useRef(null);
    const directionsRef = useRef(null);
    const bingKey = import.meta.env.VITE_BING_KEY

    const [routePoints, setRoutePoints] = useState([])

    // const flyCoords = useContext(AppContext);

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
            console.log("filtered_data: ", filtered_data)

            // Get all node coordinates
            let allNodes = []
            allNodes = await APIService.getAllCoordinates()
            await new Promise(r => setTimeout(r, 1000));
            console.log("allNodes: ", allNodes)

            const output = generateOutput(filtered_data, allNodes);
            // console.log(JSON.stringify(output, null, 4));
            // console.log(filtered_data[0]['lat'],filtered_data[0]['lng'])
            // flyCoords.handleFlyLocation(filtered_data[0]['lat'],filtered_data[0]['lng'])
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
          const directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);
          directionsRef.current = directionsManager;
  
          directionsManager.setRequestOptions({ routeMode: Microsoft.Maps.Directions.RouteMode.truck });
          
          console.log(routePoints)
          let cnt = 0
          for (let cities of routePoints) {
         
            
            if (cnt < 1){
              console.log("cities: ", cities, cities.length)
              console.log("city length: ",Object.keys(cities).length)
              for (const key in cities) {
                if (cities.hasOwnProperty(key)) {
                  const waypoint = new Microsoft.Maps.Directions.Waypoint({
                    address: key,
                    location: new Microsoft.Maps.Location(cities[key][0], cities[key][1]),
                  });
                  directionsManager.addWaypoint(waypoint);

                }
              }
              cnt += 1;
            }
            
          }
          console.log(directionsManager)
          directionsManager.setRenderOptions({ itineraryContainer: document.getElementById('printoutPanel') });
          directionsManager.calculateDirections();
        });
  
        // Load Search module for reverse geocoding
        Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
          const searchManager = new Microsoft.Maps.Search.SearchManager(map);
          const reverseGeocodeRequestOptions = {
            location: new Microsoft.Maps.Location(29.6855555, 76.9988888), // Example location for reverse geocoding
            callback: function (answer, userData) {
              // Set view and push a pin to the map
              map.setView({ bounds: answer.bestView });
              const pushpin = new Microsoft.Maps.Pushpin(reverseGeocodeRequestOptions.location);
              map.entities.push(pushpin);
  
              // Display the formatted address in the printoutPanel
              document.getElementById('printoutPanel').innerHTML = answer.address.formattedAddress;
            },
          };
          searchManager.reverseGeocode(reverseGeocodeRequestOptions);
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
        <div>
            
                <div ref={mapRef} id="myMap" style={{ width: '100%', height: '780px' }}></div>
            
            
            {/* <div id="printoutPanel" style={{ marginTop: '20px' }}></div> */}
        </div>
    );
};

export default MapComponent;
