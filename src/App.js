import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // No need to wrap with Router
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Auth from './components/Auth';
import AdminDashboard from './components/AdminDashboard';
import ResourceTrading from './components/ResourceTrading';
import SurvivalGuide from './components/SurvivalGuide';
import NotFound from './components/NotFound'; // You can create this component to show a 404 message.

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Auth state changed:', currentUser);
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/" element={user ? <AdminDashboard /> : <Auth />} />
      {/* Routes for authenticated users */}
      {user && (
        <>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/trade" element={<ResourceTrading />} />
          <Route path="/survival" element={<SurvivalGuide />} />
        </>
      )}
      
      {/* Catch-all for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
