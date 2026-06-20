import API from './axios';

export const hotelService = {
    getAll: async () => {
        const response = await API.get('/hotels');
        return response.data;
    },

    getById: async (id) => {
        const response = await API.get(`/hotels/${id}`);
        return response.data;
    },
};