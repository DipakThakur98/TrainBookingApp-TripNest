import React, { useEffect, useState } from "react";
import "./Stations.css";

/**
 * Stations component
 * Fetches train station data from the backend and displays a list of stations.
 * Includes lightweight performance logging using console.time.
 */
const Stations = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStations = async () => {
      const start = performance.now();
      try {
        const response = await fetch('http://localhost:5000/data/CombinedStationsTrains');
        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        }
        const data = await response.json();
        const cleaned = data.map((item) => ({
          code: item.station.stnCode || item.station.stncode || "",
          name: item.station.stnName || "",
          city: item.station.stnCity || "",
        }));
        setStations(cleaned);
      } catch (err) {
        console.error("Failed to fetch stations:", err);
        setError(err.message);
      } finally {
        setLoading(false);
        const duration = performance.now() - start;
        console.log(`fetchStations completed in ${duration.toFixed(2)} ms`);
      }
    };
    fetchStations();
  }, []);

  if (loading) {
    return <div className="stations-loading">Loading stations…</div>;
  }

  if (error) {
    return <div className="stations-error">Error: {error}</div>;
  }

  return (
    <section className="stations-section">
      <h2 className="stations-title">Station Directory</h2>
      <div className="stations-grid">
        {stations.map((st, idx) => (
          <div key={idx} className="station-card glass">
            <p className="station-code">{st.code}</p>
            <p className="station-name">{st.name}</p>
            <p className="station-city">{st.city}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stations;
