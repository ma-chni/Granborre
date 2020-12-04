
import { React, useRef, useMemo } from "react";
import { Marker} from "react-leaflet";

function DraggableMarker(props) {
    const {position, setPosition} = props
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      (setPosition) => ({
         
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
         }
        },
      }),
      []
    );

    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={props.position}
        ref={markerRef}
      ></Marker>
    );
  }

  export default DraggableMarker;