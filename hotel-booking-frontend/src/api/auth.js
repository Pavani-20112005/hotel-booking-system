import API from './axios';

export const authService = {
    register: async (userData) => {
        try {
            const response = await API.post('/auth/register', userData);
            console.log('Register response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Register error:', error);
            return { success: false, message: 'Registration failed' };
        }
    },

    login: async (credentials) => {
        try {
            const response = await API.post('/auth/login', credentials);
            console.log('Login response:', response.data);

            if (response.data.success) {
                localStorage.setItem('user', JSON.stringify(response.data));
                console.log('User saved to localStorage');
            }
            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Login failed' };
        }
    },

    logout: () => {
        localStorage.removeItem('user');
        console.log('User removed from localStorage');
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        console.log('Getting user from localStorage:', user);
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated: () => {
        const user = localStorage.getItem('user');
        return !!user;
    }
};