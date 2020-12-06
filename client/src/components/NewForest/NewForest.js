import { React, useState } from "react";
import "./NewForest.css";
import { withRouter } from "react-router-dom";
import { MapContainer, TileLayer } from "react-leaflet";
import axios from "axios";
import { API_BASE_URL } from "../../constants/apiConstants";
import DraggableMarker from "../Draggable/Draggable";

const center = {
  lat: 62.51193074415761,
  lng: 15.9481670685492,
};

let coordinates = {
  lat: 62.51193074415761,
  lng: 15.9481670685492,
};

function NewForest(props) {
  const redirectToMenu = () => {
    props.history.push("/menu");
    props.showError(null);
  };

  const [position, setPosition] = useState(center);

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      email: props.userEmail,
      coordinates: position,
    };

    axios
      .post(API_BASE_URL + "/user/saveforest", payload)
      .then(function (response) {
        if (response.status === 200) {
          props.showError(null);
          redirectToMenu();
        } else {
          props.showError("Skogen sparades inte");
        }
      })
      .catch(function (error) {
        if (error.response) {
          props.showError(
            "Skogen sparades inte. Returnera till login sidan och försök igen."
          );
        }
      });
  };
  return (
    <div className="new-map-container">
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

        <DraggableMarker position={position} setPosition={setPosition} />
      </MapContainer>
      <button
        type="submit"
        className="submit-btn over-btn top-over-btn"
        onClick={handleSubmitClick}
      >
        Spara Skogen
      </button>
      <button
        className="grey-btn over-btn bottom-over-btn"
        onClick={() => redirectToMenu()}
      >
        Tillbaka
      </button>
    </div>
  );
}

export default withRouter(NewForest);
