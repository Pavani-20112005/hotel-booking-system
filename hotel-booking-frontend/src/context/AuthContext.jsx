import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../api/auth';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = authService.getCurrentUser();
        console.log('Stored user on load:', storedUser);
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const response = await authService.login(credentials);
            console.log('Login response:', response);

            if (response.success) {
                setUser(response);
                toast.success('✅ Login successful!');
                return { success: true };
            } else {
                toast.error(response.message || 'Login failed');
                return { success: false, message: response.message };
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Login failed. Please try again.');
            return { success: false, message: 'Login failed' };
        }
    };

    const register = async (userData) => {
        try {
            const response = await authService.register(userData);
            if (response.success) {
                toast.success('✅ Registration successful! Please login.');
                return response;
            } else {
                toast.error(response.message || 'Registration failed');
                return response;
            }
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('Registration failed. Please try again.');
            return { success: false, message: 'Registration failed' };
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        toast.info('Logged out successfully');
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN'
    };

    console.log('AuthContext value:', value);

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;