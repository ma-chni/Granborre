import { React, useState, useRef, useMemo } from "react";
import logo from "../../images/logo.svg";
import "./NewForest.css";
import { withRouter } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import axios from "axios";
import { API_BASE_URL } from "../../constants/apiConstants";
import DraggableMarker from "../Draggable/Draggable"


const center = {
  lat: 62.51193074415761,
  lng: 15.9481670685492,
};

let coordinates = {
  lat: 62.51193074415761,
  lng: 15.9481670685492,
};

function NewForest(props) {
  const [position, setPosition] = useState(center);

  const handleSubmitClick = (e) => {
    e.preventDefault();
    console.log(props.userEmail);
    const payload = {
      email: props.userEmail,
      coordinates: position
    };
    axios
      .post(API_BASE_URL + "/user/me", payload)
      .then(function (response) {
        if (response.status === 200) {
          console.log("Log in successful")
          props.showError(null);
        } else if (response.status === 204) {
          props.showError("Invalid email/password");
        } else {
          props.showError("Invalid email/password");
        }
      })
      .catch(function (error) {
        if (error.response.data.message === "error") {
          props.showError("Invalid email/password. Please try again");
        }
      });
  };
  return (
    <MapContainer
      className="markercluster-map"
      center={center}
      zoom={5}
      maxZoom={18}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <DraggableMarker position={position} setPosition={setPosition}/>
      <button
        type="submit"
        className="submit-btn"
        onClick={handleSubmitClick}
      >
        Spara Skogen
          </button>
    </MapContainer>
  );
}






export default withRouter(NewForest);
