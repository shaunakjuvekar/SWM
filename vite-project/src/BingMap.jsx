import React, { useEffect, useRef, useState } from "react";
import APIService from "./APIService";
import BingSearchBar from './BingSearchBar';

import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "./Routes.css";

const MapComponent = () => {
  const mapContainerRef = useRef(null); // for DOM element
  const mapRef = useRef(null); // for map instance
  const directionsRef = useRef(null);
  const bingKey = import.meta.env.VITE_BING_KEY;

  const [routePoints, setRoutePoints] = useState([]);
  // const [finalRouteMap, setRouteMap] = useState(null);
  const [dropdownRoutes, setDropdownRoutes] = useState([]);
  const [routeNumber, setRouteNumber] = useState(null)

  const colorArray = [
    "blue",
    "brown",
    "DarkGreen",
    "orange",
    "gray",
    "DarkTurquoise",
    "SlateBlue",
    "purple",
  ];

  function clickHandler(e) {
    let val = e.target.innerHTML;
    let routeKey = parseInt(val.match(/\d+/)[0]);
    setRouteNumber(routeKey);
    Microsoft.Maps.loadModule("Microsoft.Maps.Directions", () => {
      if (directionsRef.current) {
        directionsRef.current.clearDisplay();
        directionsRef.current.clearAll();
      }

      if (mapRef.current) {
        mapRef.current.entities.clear(); // Clear all map entities
      }

      // Initialize the DirectionsManager for the current route
      const directionsManager = new Microsoft.Maps.Directions.DirectionsManager(
        mapRef.current,
      );
      directionsRef.current = directionsManager;

      directionsManager.setRequestOptions({
        routeMode: Microsoft.Maps.Directions.RouteMode.truck,
      });

      directionsManager.setRenderOptions({
        waypointPushpinOptions: {
          showInputPanel: true,
          visible: false,
        },
        drivingPolylineOptions: {
          strokeColor: colorArray[routeKey],
        },
      });

      let truckRoute = routePoints[routeKey];
      console.log(truckRoute);

      let cnt = 1; // Initialize cnt before adding waypoints
      for (let key in truckRoute) {
        if (truckRoute.hasOwnProperty(key)) {
          let location = new Microsoft.Maps.Location(
            truckRoute[key][0],
            truckRoute[key][1],
          );

          let waypoint = new Microsoft.Maps.Directions.Waypoint({
            address: key,
            location: location,
          });

          directionsManager.addWaypoint(waypoint);

          const pushpin = new Microsoft.Maps.Pushpin(location, {
            title: key,
            text: cnt.toString(),
            draggable: true,
          });

          mapRef.current.entities.push(pushpin);
          cnt += 1;
        }
      }
      directionsManager.calculateDirections();
    });
  }

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
    markers.forEach((marker) => {
      const label = marker.label;
      const baseCoords = getCoords(label, allCoords);
      let routes = [];
      if (marker.routes) {
        try {
          routes = JSON.parse(marker.routes.replace(/'/g, '"'));
        } catch (error) {
          console.error(`Error parsing routes for marker ${label}:`, error);
        }
        routes.forEach((route) => {
          const routeDict = { [label]: baseCoords };
          route.forEach((node) => {
            routeDict[node] = getCoords(node, allCoords);
          });
          output.push(routeDict);
        });
      }
    });
    return output;
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await APIService.getRoutes();
      const filteredData = data.filter((e) => e.route_costs.length > 0);

      const allNodes = await APIService.getAllCoordinates();
      const output = generateOutput(filteredData, allNodes);

      setRoutePoints(output);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loadMap = () => {
      const map = new Microsoft.Maps.Map(mapContainerRef.current, {
        center: new Microsoft.Maps.Location(37.229572, -80.4139),
        zoom: 12,
        showSearchBar: false,
      });

      mapRef.current = map; // Store map instance in mapRef
    };

    const routeLabels = routePoints.map((_, i) => i);
    setDropdownRoutes(routeLabels);

    if (window.Microsoft && window.Microsoft.Maps) {
      loadMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://www.bing.com/api/maps/mapcontrol?callback=loadMap&key=${bingKey}`;
      script.async = true;
      script.defer = true;
      window.loadMap = loadMap;
      document.head.appendChild(script);
    }

    return () => {
      if (mapContainerRef.current) {
        mapContainerRef.current.innerHTML = "";
      }
    };
  }, [routePoints, bingKey]);

  return (
    <div style={{ position: "relative" }}>
      <BingSearchBar
           mapRef={mapRef} 
        />
      {routeNumber!=null && <h1 className='routeHeading' >Route {routeNumber}</h1>}
      <DropdownButton
        id="karnal-routes"
        title="Dropdown button"
        onClick={clickHandler}
      >
        {dropdownRoutes.length > 0
          ? dropdownRoutes.map((route_number) => (
              <Dropdown.Item href="#" key={route_number}>
                Route {route_number}
              </Dropdown.Item>
            ))
          : null}
      </DropdownButton>
      <div
        ref={mapContainerRef}
        id="myMap"
        style={{ width: "100%", height: "780px" }}
      ></div>
    </div>
  );
};

export default MapComponent;
