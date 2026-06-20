import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const [stats, setStats] = useState({ totalHotels: 0, totalUsers: 0, totalRooms: 0, totalBookings: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await API.get('/admin/dashboard');
            setStats(res.data);
        } catch (error) {
            toast.error('Failed to load dashboard');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    const cards = [
        { title: 'Hotels', value: stats.totalHotels, color: 'bg-primary', icon: '🏨' },
        { title: 'Rooms', value: stats.totalRooms, color: 'bg-success', icon: '🛏️' },
        { title: 'Users', value: stats.totalUsers, color: 'bg-warning', icon: '👤' },
        { title: 'Bookings', value: stats.totalBookings, color: 'bg-info', icon: '📋' },
    ];

    return (
        <div>
            <h2 className="my-4">📊 Admin Dashboard</h2>
            <div className="row">
                {cards.map((c, i) => (
                    <div className="col-md-3 mb-3" key={i}>
                        <div className={`card text-white ${c.color}`}>
                            <div className="card-body">
                                <h6>{c.icon} {c.title}</h6>
                                <h2 className="mb-0">{c.value}</h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;