import React from "react";
import '../App.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const Map = ({lat, long}) => {

    return (
        <div className="leaflet-container">
            <MapContainer center={[lat, long]} zoom={12}scrollWheelZoom={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <Marker position={[lat, long]}/>
            </MapContainer>
        </div>
    );
};

export default Map;