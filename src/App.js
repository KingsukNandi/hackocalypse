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
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Router>
            <Routes>
                {!user ? (
                    <Route path="/" element={<Auth />} />
                ) : (
                    <>
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/trade" element={<ResourceTrading />} />
                        <Route path="/survival" element={<SurvivalGuide />} />
                    </>
                )}
            </Routes>
        </Router>
    );
}
console.log(Auth, AdminDashboard, ResourceTrading, SurvivalGuide);
export default App;
