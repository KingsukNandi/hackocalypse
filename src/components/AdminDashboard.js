import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { firestore } from '../firebase';

function AdminDashboard() {
  const [criticalAlerts, setCriticalAlerts] = useState([]);
  const [newAlert, setNewAlert] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const alertsQuery = query(
      collection(firestore, 'criticalAlerts'), 
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(alertsQuery, 
      (snapshot) => {
        const alerts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCriticalAlerts(alerts);
        setLoading(false);
      },
      (err) => {
        setError('Failed to load alerts');
        setLoading(false);
        console.error('Error fetching alerts:', err);
      }
    );

    return () => unsubscribe();
  }, []);

  const broadcastAlert = async () => {
    if (newAlert.trim()) {
      try {
        await addDoc(collection(firestore, 'criticalAlerts'), {
          message: newAlert,
          timestamp: new Date(),
          severity: 'critical'
        });
        setNewAlert('');
      } catch (error) {
        console.error("Error broadcasting alert:", error);
      }
    }
  };

  const formattedTimestamp = (timestamp) => {
    return new Date(timestamp.seconds * 1000).toLocaleString();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <textarea 
        value={newAlert}
        onChange={(e) => setNewAlert(e.target.value)}
        placeholder="Broadcast a critical update"
      />
      <button onClick={broadcastAlert}>
        Send Emergency Broadcast
      </button>

      {loading && <p>Loading alerts...</p>}
      {error && <p>{error}</p>}

      <div>
        <h3>Critical Alerts History</h3>
        {criticalAlerts.length === 0 ? (
          <p>No alerts found.</p>
        ) : (
          criticalAlerts.map(alert => (
            <div key={alert.id}>
              <div>{alert.message}</div>
              <div>{formattedTimestamp(alert.timestamp)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
