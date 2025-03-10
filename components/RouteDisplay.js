import { useState } from 'react';
import styles from '../styles/RouteDisplay.module.css';

export default function RouteDisplay({ routes }) {
  const [selectedRoute, setSelectedRoute] = useState(null);
  
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  return (
    <div className={styles.routesContainer}>
      <h2>Optimal Routes Found ({routes.length})</h2>
      
      <div className={styles.routesList}>
        {routes.map(route => (
          <div 
            key={route.id}
            className={`${styles.routeCard} ${selectedRoute === route.id ? styles.selected : ''}`}
            onClick={() => setSelectedRoute(route.id === selectedRoute ? null : route.id)}
          >
            <div className={styles.routeSummary}>
              <div className={styles.routeStats}>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Duration:</span>
                  <span className={styles.statValue}>{formatDuration(route.totalDuration)}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Cost:</span>
                  <span className={styles.statValue}>${route.totalCost}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Stops:</span>
                  <span className={styles.statValue}>{route.stops}</span>
                </div>
              </div>
              
              <div className={styles.routePreview}>
                {route.segments[0].from} → 
                {route.stops > 0 ? ' ... → ' : ' '}
                {route.segments[route.segments.length - 1].to}
              </div>
            </div>
            
            {selectedRoute === route.id && (
              <div className={styles.routeDetails}>
                <div className={styles.timeline}>
                  {route.segments.map((segment, idx) => (
                    <div key={idx} className={styles.segment}>
                      <div className={styles.segmentPoint}>
                        <div className={styles.point}></div>
                        <div className={styles.city}>{segment.from}</div>
                      </div>
                      
                      <div className={styles.segmentLine}>
                        <div className={styles.line}></div>
                        <div className={styles.segmentInfo}>
                          <div>{segment.airline}</div>
                          <div>{formatDuration(segment.duration)}</div>
                        </div>
                      </div>
                      
                      {idx === route.segments.length - 1 && (
                        <div className={styles.segmentPoint}>
                          <div className={styles.point}></div>
                          <div className={styles.city}>{segment.to}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 