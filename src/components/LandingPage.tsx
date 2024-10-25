import React, { useEffect, useRef, useState } from 'react';
import { Anchor, Shield, Radio, ArrowRight } from 'lucide-react';
import Map, { MapRef } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface LandingPageProps {
  onExplore: () => void;
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoibXVlbGxlcnYiLCJhIjoiY2t2c2pvYW8wMmxqczMya2w2ZjFzMGpmaiJ9.S2t4OqrepTP7llXLJfVP8w';

export default function LandingPage({ onExplore }: LandingPageProps) {
  const mapRef = useRef<MapRef>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden bg-gray-900">
      {/* Background Map */}
      <div className="absolute inset-0 z-0">
        <Map
          ref={mapRef}
          mapboxAccessToken={MAPBOX_TOKEN}
          initialViewState={{
            longitude: 54.994410206317845,
            latitude: 25.176810243940675,
            zoom: 13,
            pitch: 45,
            bearing: -15
          }}
          mapStyle="mapbox://styles/mapbox/dark-v11"
          interactive={false}
          style={{ width: '100%', height: '100%' }}
        />
        <div 
          className="absolute inset-0 bg-black bg-opacity-80"
          style={{
            mask: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
            WebkitMask: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
            transition: 'all 0.1s ease-out'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Anchor className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">DarkVessel</span>
            </div>
            <button
              onClick={onExplore}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-medium transition-colors text-white"
            >
              Launch Detection
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="container mx-auto px-6 pt-20 pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 text-white">
              Detect Dark Vessel Activities in Real-Time
            </h1>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Advanced SAR technology to track unauthorized crude oil transfers, 
              vessel disappearances, and suspicious maritime activities worldwide.
            </p>
            <button
              onClick={onExplore}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full text-lg font-medium transition-colors inline-flex items-center space-x-2 text-white group"
            >
              <span>Start Monitoring</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </main>

        {/* Features */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center backdrop-blur-sm bg-black bg-opacity-30 p-8 rounded-2xl">
                <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Radio className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">SAR Detection</h3>
                <p className="text-gray-300">
                  All-weather radar imaging to detect vessels attempting to hide their activities
                </p>
              </div>
              <div className="text-center backdrop-blur-sm bg-black bg-opacity-30 p-8 rounded-2xl">
                <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Illicit Transfer Detection</h3>
                <p className="text-gray-300">
                  Identify unauthorized ship-to-ship transfers of crude oil products
                </p>
              </div>
              <div className="text-center backdrop-blur-sm bg-black bg-opacity-30 p-8 rounded-2xl">
                <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Anchor className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Port Monitoring</h3>
                <p className="text-gray-300">
                  24/7 surveillance of key ports and maritime chokepoints
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="container mx-auto px-6 py-24">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-3xl p-12 text-center backdrop-blur-sm bg-opacity-90">
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Enhance Maritime Security?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join the fight against illegal maritime activities with our advanced detection platform.
            </p>
            <button
              onClick={onExplore}
              className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-full text-lg font-medium transition-colors inline-flex items-center space-x-2 group"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}