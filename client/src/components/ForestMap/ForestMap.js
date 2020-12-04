import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import logo from "../../images/logo.svg";
import { API_BASE_URL } from "../../constants/apiConstants";
import { withRouter } from "react-router-dom";
import { loadModules } from 'esri-loader';
import "./ForestMap.css";

const WebMapView = (props) => {
    const mapRef = useRef();
    const center = {lat: 0.000, lng:0.000};
    const [coordinates, setCoordinates] = useState(center);
    axios
        .get(API_BASE_URL + "/user/getcoordinates", { headers: { 'token': localStorage.getItem('login_access_token'), 'email': props.userEmail } })
        .then(function (response) {
            if (response.status === 200) {
                setCoordinates(response.data.response.coordinates);               
                
            } 
        })
        .catch(function (error) {
            if (error) {
                props.showError("Failed to fetch coordinates");
            } 
        });

    useEffect(
        () => {
           /*  console.log("The coordinates are ",coordinates); */
            // lazy load the required ArcGIS API for JavaScript modules and CSS
            loadModules(['esri/Map', 'esri/views/MapView'], { css: true })
                .then(([ArcGISMap, MapView]) => {
                    const map = new ArcGISMap({
                        basemap: 'topo-vector'
                    });
                    // load the map view at the ref's DOM node
                    const view = new MapView({
                        container: mapRef.current,
                        map: map,
                        center: [coordinates.lat, coordinates.lng],
                        zoom: 6
                    });
                    return () => {
                        if (view) {
                            // destroy the map view
                            view.destroy();
                        }
                    };
                });
        }
    );
    return <div className="webmap" ref={mapRef} />;
};

export default withRouter(WebMapView);