import { useState } from 'react';
import styles from '../styles/SearchForm.module.css';

export default function SearchForm({ onSearch }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [preferences, setPreferences] = useState({
    prioritizeCost: false,
    prioritizeTime: true,
    maxLayovers: 2
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      from,
      to,
      preferences
    });
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <label htmlFor="from">From</label>
            <input
              id="from"
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Departure city"
              required
              className={styles.input}
            />
          </div>
          
          <div className={styles.switchIcon}>
            ⇄
          </div>
          
          <div className={styles.inputWrapper}>
            <label htmlFor="to">To</label>
            <input
              id="to"
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Destination city"
              required
              className={styles.input}
            />
          </div>
        </div>
        
        <div className={styles.preferencesContainer}>
          <h3>Preferences</h3>
          <div className={styles.preferences}>
            <div className={styles.preference}>
              <input
                id="prioritizeCost"
                type="checkbox"
                checked={preferences.prioritizeCost}
                onChange={() => setPreferences({
                  ...preferences,
                  prioritizeCost: !preferences.prioritizeCost,
                  prioritizeTime: preferences.prioritizeCost ? preferences.prioritizeTime : false
                })}
              />
              <label htmlFor="prioritizeCost">Prioritize Cost</label>
            </div>
            
            <div className={styles.preference}>
              <input
                id="prioritizeTime"
                type="checkbox"
                checked={preferences.prioritizeTime}
                onChange={() => setPreferences({
                  ...preferences,
                  prioritizeTime: !preferences.prioritizeTime,
                  prioritizeCost: preferences.prioritizeTime ? preferences.prioritizeCost : false
                })}
              />
              <label htmlFor="prioritizeTime">Prioritize Time</label>
            </div>
            
            <div className={styles.preference}>
              <label htmlFor="maxLayovers">Max Layovers:</label>
              <select
                id="maxLayovers"
                value={preferences.maxLayovers}
                onChange={(e) => setPreferences({
                  ...preferences,
                  maxLayovers: parseInt(e.target.value)
                })}
                className={styles.select}
              >
                <option value="0">Direct flights only</option>
                <option value="1">Max 1 layover</option>
                <option value="2">Max 2 layovers</option>
                <option value="3">Max 3 layovers</option>
              </select>
            </div>
          </div>
        </div>
        
        <button type="submit" className={styles.searchButton}>
          Find Optimal Routes
        </button>
      </form>
    </div>
  );
} 