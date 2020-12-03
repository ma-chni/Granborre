import { React, useState, useRef, useMemo } from "react";
import logo from "../../images/logo.svg";
import "./NewForest.css";
import { withRouter } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

const center = {
  lat: 62.51193074415761,
  lng: 15.9481670685492,
};

let coordinates = {
  lat: 62.51193074415761,
  lng: 15.9481670685492,
};

function DraggableMarker() {
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          const latLng = marker.getLatLng();

          coordinates.lat = latLng.lat;
          coordinates.lng = latLng.lng;

          console.log(coordinates);
        }
      },
    }),
    []
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    ></Marker>
  );
}

function NewForest() {
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

      <DraggableMarker />
    </MapContainer>
  );
}

export default withRouter(NewForest);
