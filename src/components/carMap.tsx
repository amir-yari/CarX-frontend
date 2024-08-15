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

function LocationMarker({
  onLocationFound,
}: {
  onLocationFound: (position: LatLngExpression) => void;
}) {
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      setPosition(e.latlng);
      onLocationFound(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);

  return position ? (
    <Marker position={position}>
      <Tooltip permanent>You are here</Tooltip>
    </Marker>
  ) : null;
}

const CarMap = () => {
  const cars = useCarSelector((state) => state.car.items);
  const carLocations = cars.filter((car) => car.location?.coordinates);

  const [mapCenter, setMapCenter] = useState<LatLngExpression | null>(null);

  const handleLocationFound = (position: LatLngExpression) => {
    setMapCenter(position);
  };

  const defaultCenter: LatLngExpression = [37.7749, -122.4194]; // Default to San Francisco if no user location

  return (
    <MapContainer
      center={mapCenter || defaultCenter}
      zoom={13}
      style={{ height: "40rem", width: "100%", borderRadius: "1rem" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {carLocations.map((car) => {
        const position = [
          car.location!.coordinates[1],
          car.location!.coordinates[0],
        ] as LatLngExpression;

        return (
          <Marker key={car.carId} position={position}>
            <Tooltip>{`${car.make} ${car.model}`}</Tooltip>
          </Marker>
        );
      })}

      <LocationMarker onLocationFound={handleLocationFound} />
    </MapContainer>
  );
};

export default CarMap;
