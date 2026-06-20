import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import HotelList from './components/hotels/HotelList';
import HotelDetails from './components/hotels/HotelDetails';
import BookingForm from './components/bookings/BookingForm';
import BookingHistory from './components/bookings/BookingHistory';
import Dashboard from './components/admin/Dashboard';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
    const { isAuthenticated, isAdmin } = useAuth();
    return isAuthenticated && isAdmin ? children : <Navigate to="/" />;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<HotelList />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/hotels/:id" element={<HotelDetails />} />
                        <Route path="/book" element={<ProtectedRoute><BookingForm /></ProtectedRoute>} />
                        <Route path="/my-bookings" element={<ProtectedRoute><BookingHistory /></ProtectedRoute>} />
                        <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
                    </Routes>
                </div>
                <ToastContainer position="top-right" autoClose={3000} />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;