import React from "react";
import '../App.css';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';

const Map = ({lat, long}) => {
    const position = [lat, long]
    function ChangeMapView({ coords }) {
        const map = useMap();
        map.setView(coords, map.getZoom());
      
        return null;
      }
      
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