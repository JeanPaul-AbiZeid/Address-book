import React, {useState, useRef, useMemo} from "react";
import '../App.css';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';

const Map = ({lat, long}) => {

    const position = [lat, long]

    function ChangeMapView({ coords }) {
        const map = useMap();
        map.setView(coords, map.getZoom());
      
        return null;
    }

    // function DraggableMarker({setLoc}) {
    //     const [postion, setPosition] = useState([33.896694, 35.541887])
    //     const markerRef = useRef(null)
    //     const eventHandlers = useMemo(
    //         () => ({
    //             dragend() {
    //                 const marker = markerRef.current
    //                 if (marker != null) {
    //                     setPosition(marker.getLatLng());
    //                     setLoc([marker.getLatLng().lat, marker.getLatLng().lng]);
    //                     console.log(marker.getLatLng().lat);
    //                 }
    //             },
    //         }),
    //         [],
    //     )
    //     const map = useMapEvents({
    //         resize() {
    //             map.flyTo(position, map.getZoom())
    //         },
    //     })

    //     return (
    //         <Marker
    //             draggable={true}
    //             eventHandlers={eventHandlers}
    //             position={position}
    //             ref={markerRef}>
    //         </Marker>
    //     )
    // }
      
    return (
        <div className="leaflet-container">
            <MapContainer center={position} zoom={12} scrollWheelZoom={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <Marker position={position}/>
                <ChangeMapView coords={position} />

            </MapContainer>
        </div>
    );
};

export default Map;