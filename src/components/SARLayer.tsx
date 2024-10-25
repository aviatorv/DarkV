import React from 'react';
import { Source, Layer } from 'react-map-gl';

interface SARLayerProps {
  visible: boolean;
}

export default function SARLayer({ visible }: SARLayerProps) {
  // Using Sentinel Hub's WMS service for Sentinel-1 SAR data
  const sarSource = {
    type: 'raster',
    tiles: [
      'https://services.sentinel-hub.com/ogc/wms/c333fdf1-3815-4190-9433-8c66bb1cf7f0?' +
      'SERVICE=WMS&REQUEST=GetMap&LAYERS=SENTINEL1_IW_VV&' +
      'MAXCC=20&GAIN=1.0&TIME=2024-01-01/2024-03-14&' +
      'BBOX={bbox-epsg-3857}&FORMAT=image/png&WIDTH=256&HEIGHT=256&' +
      'SRS=EPSG:3857'
    ],
    tileSize: 256
  };

  return visible ? (
    <Source id="sar-source" {...sarSource}>
      <Layer
        id="sar-layer"
        type="raster"
        paint={{
          'raster-opacity': 0.7,
          'raster-contrast': 1.1,
          'raster-brightness-min': 0.2
        }}
      />
    </Source>
  ) : null;
}