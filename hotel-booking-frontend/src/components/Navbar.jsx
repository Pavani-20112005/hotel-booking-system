import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, isAuthenticated, isAdmin } = useAuth();
    const navigate = useNavigate();

    console.log('Navbar - isAuthenticated:', isAuthenticated);
    console.log('Navbar - user:', user);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold fs-3" to="/">
                    🏨 Hotel Booking
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        {/* Home Link */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/">🏠 Home</Link>
                        </li>

                        {isAuthenticated ? (
                            // ✅ LOGGED IN - SHOW MENU WITH SIGNOUT
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/my-bookings">📋 My Bookings</Link>
                                </li>

                                {isAdmin && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin">📊 Dashboard</Link>
                                    </li>
                                )}

                                {/* User Dropdown */}
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="userDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        👤 {user?.name || 'User'}
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                        <li>
                                            <Link className="dropdown-item" to="/profile">
                                                👤 Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/my-bookings">
                                                📋 My Bookings
                                            </Link>
                                        </li>
                                        {isAdmin && (
                                            <li>
                                                <Link className="dropdown-item" to="/admin">
                                                    📊 Admin Dashboard
                                                </Link>
                                            </li>
                                        )}
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button
                                                className="dropdown-item text-danger fw-bold"
                                                onClick={handleLogout}
                                            >
                                                🚪 Sign Out
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        ) : (
                            // ❌ NOT LOGGED IN
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link btn btn-outline-light btn-sm mx-1 px-3" to="/login">
                                        🔐 Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link btn btn-primary btn-sm mx-1 px-3" to="/register">
                                        📝 Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;