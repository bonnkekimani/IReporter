import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import UserSideBar from './UserSideBar';
const Map = () => {
  const defaultPosition = [-1.2832533, 36.8172449];
  const zoom = 14;
  const [markers, setMarkers] = useState([]);
  const [latitude, setLatitude] = useState(defaultPosition[0]);
  const [longitude, setLongitude] = useState(defaultPosition[1]);
  const [placeName, setPlaceName] = useState('');
  const [error, setError] = useState(null);
  const [markerCounter, setMarkerCounter] = useState(0);
  useEffect(() => {
    const storedMarkers = JSON.parse(localStorage.getItem('markers'));
    if (storedMarkers && Array.isArray(storedMarkers) && storedMarkers.length > 0) {
      setMarkers(storedMarkers);
      setMarkerCounter(storedMarkers.length);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('markers', JSON.stringify(markers));
  }, [markers]);
  const handleInputChange = (event) => {
    setPlaceName(event.target.value);
  };
  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };
  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const nominatimURL = `https://nominatim.openstreetmap.org/search?q=${placeName}&format=json`;
      const response = await fetch(nominatimURL);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setLatitude(lat);
        setLongitude(lon);
        setError(null);
      } else {
        setError('Location not found');
      }
    } catch (error) {
      console.log('Error geocoding:', error);
      setError('Error fetching location data');
    }
  };
  const handleLockMarker = (markerId) => {
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.id === markerId ? { ...marker, isLocked: !marker.isLocked } : marker
      )
    );
  };
  const handleDeleteMarker = (markerId) => {
    setMarkers((prevMarkers) => prevMarkers.filter((marker) => marker.id !== markerId));
  };
  const handleAddMarker = () => {
    const newMarker = {
      id: markerCounter + 1,
      position: [latitude, longitude],
      isLocked: false,
    };
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    setMarkerCounter(markerCounter + 1);
  };
  const handleSomeAction = (markerId) => {
    const passwordInput = prompt('Enter password');
    if (passwordInput === 'gov2023') {
      setMarkers((prevMarkers) =>
        prevMarkers.map((prevMarker) =>
          prevMarker.id === markerId ? { ...prevMarker, color: 'green' } : prevMarker
        )
      );
    } else {
      alert('Incorrect password');
    }
  };
  return (
    <div style={{ width: '90%',marginLeft: '200px', height: '400px' }}>
       {/* <UserSideBar/> */}
      <MapContainer center={defaultPosition} zoom={zoom} style={{ width: '95%', height: '400px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={L.divIcon({
              className: 'custom-icon',
              html: '<div class="flag-icon"></div>',
              iconSize: [25, 40],
              iconAnchor: [12, 40],
              iconColor: marker.color || 'red',
            })}
            draggable={!marker.isLocked}
            eventHandlers={{
              dragend: (e) => {
                const newPosition = e.target.getLatLng();
                setMarkers((prevMarkers) =>
                  prevMarkers.map((prevMarker) =>
                    prevMarker.id === marker.id
                      ? { ...prevMarker, position: [newPosition.lat, newPosition.lng] }
                      : prevMarker
                  )
                );
              },
            }}
          >
            <Popup>
              Marker {marker.id}
              <br />
              {placeName}
              <br />
              <button onClick={() => handleDeleteMarker(marker.id)}>Delete</button>
              <button onClick={() => handleSomeAction(marker.id)}>(e)</button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <form onSubmit={handleFormSubmit}>
        <label>
          Place Name:
          <input type="text" value={placeName} onChange={handleInputChange} />
        </label>
        <label>
          Latitude:
          <input type="number" value={latitude} onChange={handleLatitudeChange} step="0.0001" />
        </label>
        <label>
          Longitude:
          <input type="number" value={longitude} onChange={handleLongitudeChange} step="0.0001" />
        </label>
        <button  type="submit" style={{ width: '150px', height:'60px', marginBottom:'20px'}}>Update Marker Position</button>
      </form>
      <button onClick={handleAddMarker}>Add Marker</button>
      {markers.map((marker) => (
        <button key={marker.id} onClick={() => handleLockMarker(marker.id)}>
          {marker.isLocked ? `Unlock Marker ${marker.id}` : `Lock Marker ${marker.id}`}
        </button>
      ))}
      {error && <div>{error}</div>}
    </div>
  );
};
export default Map;