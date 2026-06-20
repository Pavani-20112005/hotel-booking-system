import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';

const HotelList = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        try {
            const response = await API.get('/hotels');
            console.log('API Response:', response.data); // Debug log

            // ✅ FIX: Make sure hotels is always an array
            let hotelData = response.data;

            // If response is an object with 'content' property (pagination)
            if (hotelData && hotelData.content) {
                hotelData = hotelData.content;
            }

            // If response is not an array, convert to empty array
            if (!Array.isArray(hotelData)) {
                hotelData = [];
            }

            setHotels(hotelData);
        } catch (error) {
            console.error('Error fetching hotels:', error);
            setHotels([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center mt-5">Loading hotels...</div>;
    }

    // ✅ FIX: Ensure hotels is an array before using .filter
    const filtered = Array.isArray(hotels)
        ? hotels.filter(hotel =>
            hotel?.hotelName?.toLowerCase().includes(search.toLowerCase()) ||
            hotel?.city?.toLowerCase().includes(search.toLowerCase())
        )
        : [];

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center my-4">
                <h2>🏨 Available Hotels</h2>
                <span className="badge bg-primary">{Array.isArray(hotels) ? hotels.length : 0} Hotels</span>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="🔍 Search by hotel or city..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            {filtered.length === 0 ? (
                <div className="text-center py-5">
                    <p>No hotels found.</p>
                </div>
            ) : (
                <div className="row">
                    {filtered.map((hotel) => (
                        <div className="col-md-4 mb-4" key={hotel.id || Math.random()}>
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="text-primary">{hotel.hotelName || 'Hotel'}</h5>
                                    <p className="text-muted">📍 {hotel.city || 'City'}</p>
                                    <p className="small">{hotel.description?.substring(0, 100) || ''}...</p>
                                    <span className="badge bg-warning text-dark">⭐ {hotel.rating || 0}</span>
                                    <Link to={`/hotels/${hotel.id}`} className="btn btn-primary btn-sm w-100 mt-2">
                                        View Details →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HotelList;