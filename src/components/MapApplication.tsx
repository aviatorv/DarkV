import React, { useState, useCallback, useRef } from 'react';
import Map, { MapRef } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import SearchBar from './SearchBar';
import MapControls from './MapControls';
import MapStyleToggle from './MapStyleToggle';
import CoordinatesPanel from './CoordinatesPanel';
import SARLayer from './SARLayer';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibXVlbGxlcnYiLCJhIjoiY2t2c2pvYW8wMmxqczMya2w2ZjFzMGpmaiJ9.S2t4OqrepTP7llXLJfVP8w';

type MapStyle = 'satellite' | 'streets';

export default function MapApplication() {
  const mapRef = useRef<MapRef>(null);
  const [mapStyle, setMapStyle] = useState<MapStyle>('satellite');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [showSAR, setShowSAR] = useState(false);
  const [coordinates, setCoordinates] = useState({
    latitude: 42.48347126741438,
    longitude: 27.465535735074138,
  });

  const handleCoordinatesChange = useCallback((lat: number, lon: number) => {
    setCoordinates({ latitude: lat, longitude: lon });
    mapRef.current?.flyTo({
      center: [lon, lat],
      duration: 2000,
    });
  }, []);

  const handleZoomIn = useCallback(() => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.easeTo({ zoom: currentZoom + 1, duration: 300 });
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.easeTo({ zoom: currentZoom - 1, duration: 300 });
    }
  }, []);

  const togglePanel = useCallback(() => {
    setIsPanelOpen(prev => !prev);
  }, []);

  const toggleSAR = useCallback(() => {
    setShowSAR(prev => !prev);
  }, []);

  const getMapStyle = (style: MapStyle) => {
    return style === 'satellite' 
      ? 'mapbox://styles/mapbox/satellite-streets-v12'
      : 'mapbox://styles/mapbox/streets-v12';
  };

  return (
    <div className="h-screen w-screen relative">
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: coordinates.longitude,
          latitude: coordinates.latitude,
          zoom: 11
        }}
        mapStyle={getMapStyle(mapStyle)}
        style={{ width: '100%', height: '100%' }}
      >
        <SARLayer visible={showSAR} />
        <SearchBar onMenuClick={togglePanel} />
        <MapControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
        />
        <MapStyleToggle
          currentStyle={mapStyle}
          onStyleChange={setMapStyle}
          showSAR={showSAR}
          onSARToggle={toggleSAR}
        />
      </Map>
      
      <CoordinatesPanel
        isOpen={isPanelOpen}
        onClose={togglePanel}
        coordinates={coordinates}
        onCoordinatesChange={handleCoordinatesChange}
      />
    </div>
  );
}