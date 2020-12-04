import React, { useEffect, useRef , useState} from 'react';
/* import ArcGISMap from 'esri/Map';
import MapView from 'esri/views/MapView'; */
import axios from "axios";
import logo from "../../images/logo.svg";
import { API_BASE_URL } from "../../constants/apiConstants";
import { withRouter } from "react-router-dom";


const WebMapView = (props) => {
    const mapRef = useRef();
    

    /* useEffect(
      () => {
        // create map
        const map = new ArcGISMap({
          basemap: 'topo-vector'
        });

        // load the map view at the ref's DOM node
        const view = new MapView({
          container: mapRef.current,
          map: map,
          center: [-118, 34],
          zoom: 8
        });

        return () => {
          if (view) {
            // destroy the map view
            view.destroy();
          }
        };
      }
    ); */

    return <div className="webmap" ref={mapRef} />;
};

export default withRouter(WebMapView);