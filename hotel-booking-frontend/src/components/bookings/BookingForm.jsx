import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import { toast } from 'react-toastify';

const BookingForm = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        roomId: '',
        checkInDate: '',
        checkOutDate: '',
        numberOfGuests: 1
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Validate
            if (!form.roomId) {
                toast.error('Please enter a Room ID');
                setLoading(false);
                return;
            }

            if (form.checkInDate >= form.checkOutDate) {
                toast.error('Check-out must be after check-in');
                setLoading(false);
                return;
            }

            const bookingData = {
                roomId: parseInt(form.roomId),
                checkInDate: form.checkInDate,
                checkOutDate: form.checkOutDate,
                numberOfGuests: parseInt(form.numberOfGuests)
            };

            console.log('📤 Sending booking:', bookingData);

            const response = await API.post('/bookings', bookingData);
            console.log('📥 Response:', response.data);

            // ✅ SUCCESS MESSAGE
            toast.success('🎉 Booking created successfully!', {
                position: "top-right",
                autoClose: 3000,
            });

            // Navigate after delay
            setTimeout(() => {
                navigate('/my-bookings');
            }, 1500);

        } catch (error) {
            console.error('❌ Error:', error);
            const message = error.response?.data?.message || 'Booking failed';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-8">
                <div className="card shadow">
                    <div className="card-body p-4">
                        <h3 className="text-center mb-4">📅 Book Your Stay</h3>

                        <div className="alert alert-info">
                            <strong>💡 Available Room IDs:</strong><br />
                            Check hotel details page for Room IDs.
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="fw-bold">Room ID</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="roomId"
                                    placeholder="Enter Room ID (e.g., 1, 2, 3)"
                                    value={form.roomId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="fw-bold">Check-in</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="checkInDate"
                                        value={form.checkInDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="fw-bold">Check-out</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="checkOutDate"
                                        value={form.checkOutDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="fw-bold">Guests</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="numberOfGuests"
                                    value={form.numberOfGuests}
                                    onChange={handleChange}
                                    min="1"
                                    max="10"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-success w-100"
                                disabled={loading}
                            >
                                {loading ? '⏳ Processing...' : '✅ Confirm Booking'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;