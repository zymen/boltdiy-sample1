import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

// Gliwice, Poland coordinates
const GLIWICE_CENTER = [50.2944, 18.6713];
const DEFAULT_ZOOM = 13;

// Custom hook to handle map events
const MapEventHandler = ({ onMapClick, pois, categoryWeights }) => {
  const map = useMapEvents({
    click: (e) => {
      const value = calculateLocationValue(e.latlng, pois, categoryWeights);
      onMapClick(value);
    }
  });
  
  return null;
};

// Custom component to handle heatmap rendering
const HeatmapLayer = ({ pois, categoryWeights }) => {
  const map = useMap();
  const heatLayerRef = useRef(null);
  
  useEffect(() => {
    // Clean up previous heatmap layer if it exists
    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current);
    }
    
    // Generate heatmap points with intensity based on category weights
    const heatPoints = [];
    
    // Create a dense grid of points for the heatmap
    const bounds = map.getBounds();
    const north = bounds.getNorth();
    const south = bounds.getSouth();
    const east = bounds.getEast();
    const west = bounds.getWest();
    
    const latStep = (north - south) / 100;
    const lngStep = (east - west) / 100;
    
    for (let lat = south; lat <= north; lat += latStep) {
      for (let lng = west; lng <= east; lng += lngStep) {
        const point = L.latLng(lat, lng);
        const intensity = calculateLocationValue(point, pois, categoryWeights);
        
        if (intensity > 0) {
          heatPoints.push([lat, lng, intensity / 10]); // Scale down intensity for better visualization
        }
      }
    }
    
    // Create and add the heatmap layer
    const heatLayer = L.heatLayer(heatPoints, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      gradient: { 0.4: 'blue', 0.6: 'cyan', 0.7: 'lime', 0.8: 'yellow', 1.0: 'red' }
    });
    
    heatLayer.addTo(map);
    heatLayerRef.current = heatLayer;
    
    return () => {
      if (heatLayerRef.current) {
        map.removeLayer(heatLayerRef.current);
      }
    };
  }, [map, pois, categoryWeights]);
  
  return null;
};

// Function to calculate location value based on POI proximity
const calculateLocationValue = (point, pois, categoryWeights) => {
  if (!pois || pois.length === 0) return 0;
  
  let totalValue = 0;
  
  pois.forEach(poi => {
    const poiPoint = L.latLng(poi.lat, poi.lng);
    const distance = point.distanceTo(poiPoint) / 1000; // Convert to kilometers
    
    // Skip if too far (more than 2km)
    if (distance > 2) return;
    
    // Apply inverse square law with a minimum distance to avoid infinity
    const minDistance = 0.05; // 50 meters minimum
    const adjustedDistance = Math.max(distance, minDistance);
    const baseValue = 1 / (adjustedDistance * adjustedDistance);
    
    // Apply category weight
    const categoryWeight = categoryWeights[poi.category] || 1;
    const weightedValue = baseValue * categoryWeight;
    
    totalValue += weightedValue;
  });
  
  return totalValue;
};

const MapComponent = ({ pois, categoryWeights, onMapClick }) => {
  return (
    <MapContainer 
      center={GLIWICE_CENTER} 
      zoom={DEFAULT_ZOOM} 
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {pois.map((poi, index) => (
        <Marker 
          key={index} 
          position={[poi.lat, poi.lng]}
        >
          <Popup>
            <div>
              <h3>{poi.name}</h3>
              <p>Category: {poi.category}</p>
            </div>
          </Popup>
        </Marker>
      ))}
      
      <HeatmapLayer pois={pois} categoryWeights={categoryWeights} />
      <MapEventHandler onMapClick={onMapClick} pois={pois} categoryWeights={categoryWeights} />
    </MapContainer>
  );
};

export default MapComponent;
