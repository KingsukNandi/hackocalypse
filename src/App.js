import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Auth from './components/Auth';
import AdminDashboard from './components/AdminDashboard';
import ResourceTrading from './components/ResourceTrading';
import SurvivalGuide from './components/SurvivalGuide';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('Auth state changed:', currentUser);
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    // Debug imported components
    console.log({ Auth, AdminDashboard, ResourceTrading, SurvivalGuide });

    return (
        <Router>
            <Routes>
                {/* Public route for Auth component */}
                <Route path="/" element={<Auth />} />

                {/* Protected routes for logged-in users */}
                {user && (
                    <>
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/trade" element={<ResourceTrading />} />
                        <Route path="/survival" element={<SurvivalGuide />} />
                    </>
                )}

                {/* 404 route for unmatched paths */}
                <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
        </Router>
    );
}

export default App;
