
import { React, useRef, useMemo } from "react";
import { Marker } from "react-leaflet";

function DraggableMarker(props) {
    
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
        () => ({

            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    props.setPosition(marker.getLatLng());
                    
                }
            },
        }),
        [props.position]      
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