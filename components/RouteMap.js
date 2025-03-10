import { useEffect, useRef } from 'react';
import styles from '../styles/RouteMap.module.css';

export default function RouteMap({ route }) {
  const mapRef = useRef(null);
  
  useEffect(() => {
    if (!route || !mapRef.current) return;
    
    // Here you would initialize a map library like Mapbox or Google Maps
    // and draw the flight path between cities
    
    // This is just a placeholder for the actual map implementation
    const mapPlaceholder = document.createElement('div');
    mapPlaceholder.className = styles.mapPlaceholder;
    mapPlaceholder.textContent = 'Flight path visualization would appear here';
    
    mapRef.current.innerHTML = '';
    mapRef.current.appendChild(mapPlaceholder);
  }, [route]);
  
  return (
    <div className={styles.mapContainer}>
      <div ref={mapRef} className={styles.map}></div>
    </div>
  );
} 