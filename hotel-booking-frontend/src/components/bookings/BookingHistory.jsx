import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { toast } from 'react-toastify';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await API.get('/bookings/user');
            console.log('Bookings:', response.data);
            setBookings(response.data || []);
        } catch (error) {
            console.error('Error:', error);
            setBookings([]);
        } finally {
            setLoading(false);
        }
    };

    const cancelBooking = async (id) => {
        if (!window.confirm('Cancel this booking?')) return;
        try {
            await API.put(`/bookings/${id}/cancel`);
            toast.success('Booking cancelled');
            fetchBookings();
        } catch (error) {
            toast.error('Failed to cancel');
        }
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div>
            <h2 className="my-4">📋 My Bookings</h2>
            {bookings.length === 0 ? (
                <div className="text-center py-5">
                    <p>No bookings found.</p>
                    <a href="/" className="btn btn-primary">Browse Hotels</a>
                </div>
            ) : (
                <div className="row">
                    {bookings.map((b) => (
                        <div className="col-md-6 mb-4" key={b.id}>
                            <div className="card shadow">
                                <div className="card-body">
                                    <h5>Booking #{b.bookingId}</h5>
                                    <p>
                                        🏨 {b.hotelName}<br />
                                        📍 {b.city}<br />
                                        📅 {b.checkInDate} → {b.checkOutDate}<br />
                                        👥 {b.numberOfGuests} guests<br />
                                        💰 ₹{b.totalAmount}
                                    </p>
                                    <span className={`badge ${b.status === 'CONFIRMED' ? 'bg-success' :
                                            b.status === 'CANCELLED' ? 'bg-danger' :
                                                'bg-warning'
                                        }`}>
                                        {b.status}
                                    </span>
                                    {b.status !== 'CANCELLED' && b.status !== 'COMPLETED' && (
                                        <button className="btn btn-danger btn-sm ms-2" onClick={() => cancelBooking(b.id)}>
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookingHistory;