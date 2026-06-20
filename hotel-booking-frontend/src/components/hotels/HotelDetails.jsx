import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const HotelDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHotel();
    }, [id]);

    const fetchHotel = async () => {
        try {
            const response = await API.get(`/hotels/${id}`);
            setHotel(response.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (!hotel) return <div className="text-center mt-5">Hotel not found</div>;

    return (
        <div>
            <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>← Back</button>
            <div className="card shadow-lg">
                <div className="card-body p-4">
                    <h2>{hotel.hotelName}</h2>
                    <p className="text-muted">📍 {hotel.address}, {hotel.city}</p>
                    <p>{hotel.description}</p>
                    <p><strong>⭐ Rating:</strong> {hotel.rating || 0}</p>
                    <button
                        className="btn btn-success btn-lg"
                        onClick={() => {
                            if (isAuthenticated) {
                                navigate(`/book?hotelId=${id}`);
                            } else {
                                toast.info('Please login to book');
                                navigate('/login');
                            }
                        }}
                    >
                        📅 Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;