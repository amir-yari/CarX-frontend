import { useState, useEffect } from "react";

import { useCarSelector } from "../store/hooks";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Tooltip,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

function LocationMarker() {
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      setPosition(e.latlng);
      // map.setView(e.latlng, map.getZoom());
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);

  return !position ? null : (
    <Marker position={position}>
      <Tooltip permanent>You are here</Tooltip>
    </Marker>
  );
}

const CarMap = () => {
  const cars = useCarSelector((state) => state.car.items);
  const carLocations = cars.filter((car) => car.location?.coordinates);

  return (
    <MapContainer
      center={carLocations[0].location!.coordinates as LatLngExpression}
      zoom={1}
      style={{ height: "40rem", width: "100%", borderRadius: "1rem" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {carLocations.map((car) => {
        const position = car.location!.coordinates as LatLngExpression;

        return (
          <Marker key={car.carId} position={position}>
            <Tooltip>{`${car.make} ${car.model}`}</Tooltip>
          </Marker>
        );
      })}

      <LocationMarker />
    </MapContainer>
  );
};

export default CarMap;
