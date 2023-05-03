import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { useEffect } from 'react';
import {Icon} from 'leaflet';

import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap } from 'react-leaflet';
import icon from "./marker-icon-2x.png"
//import icon from "./red_icon.png";

function SearchBar() {

    const markerIcon = new Icon({
      
      iconUrl: icon,
      iconAnchor: [28,15],
      iconSize: [38,38]
    })

    const map = useMap();
    useEffect(() => {
      const provider = new OpenStreetMapProvider();
      console.log(provider)
  
      const searchControl = new GeoSearchControl({
        provider,
        marker: {
          markerIcon
        }
      });
 
      map.addControl(searchControl);
  
      return () => map.removeControl(searchControl);
    }, []);
  
    return null;
  }

export default SearchBar;