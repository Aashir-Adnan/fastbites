import React, { useEffect, useRef, useState } from 'react';
import './GoogleMaps.css';

const GoogleMaps = () => {
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initMap = () => {
      try {
        // Initialize the map
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 40.7128, lng: -74.0060 }, // Default to New York City
          zoom: 15,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
        });

        // Store the map instance
        googleMapRef.current = map;

        // Add markers for campus dining locations
        const diningLocations = [
          { 
            lat: 40.7128, 
            lng: -74.0060, 
            title: 'Campus Dining Hall 1',
            info: 'Main Campus Dining Hall - Open 7AM-10PM'
          },
          { 
            lat: 40.7138, 
            lng: -74.0070, 
            title: 'Campus Dining Hall 2',
            info: 'North Campus Dining Hall - Open 7AM-9PM'
          },
        ];

        // Create an InfoWindow
        const infoWindow = new window.google.maps.InfoWindow();

        diningLocations.forEach(location => {
          const marker = new window.google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.title,
            animation: window.google.maps.Animation.DROP
          });

          // Add click listener to marker
          marker.addListener('click', () => {
            infoWindow.setContent(`
              <div class="info-window">
                <h3>${location.title}</h3>
                <p>${location.info}</p>
              </div>
            `);
            infoWindow.open(map, marker);
          });
        });

        setIsLoading(false);
      } catch (err) {
        setError('Failed to load the map. Please try again later.');
        setIsLoading(false);
      }
    };

    // Load Google Maps script
    const loadGoogleMapsScript = () => {
      if (!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
        setError('Google Maps API key is missing. Please check your environment variables.');
        setIsLoading(false);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.addEventListener('load', initMap);
      script.addEventListener('error', () => {
        setError('Failed to load Google Maps. Please check your internet connection.');
        setIsLoading(false);
      });
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();

    return () => {
      // Cleanup
      if (googleMapRef.current) {
        googleMapRef.current = null;
      }
    };
  }, []);

  if (error) {
    return (
      <div className="maps-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="maps-container">
      {isLoading && (
        <div className="maps-loading">
          <div className="loading-spinner"></div>
          <p>Loading map...</p>
        </div>
      )}
      <div ref={mapRef} className="google-map" />
    </div>
  );
};

export default GoogleMaps; 