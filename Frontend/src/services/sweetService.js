import axios from 'axios';

const API_URL = 'http://localhost:8080/api/sweets';

/**
 * Get all sweets
 */
export const getAllSweets = async () => {
    try {
        const response = await axios.get(API_URL);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.error || error.message || 'Failed to fetch sweets'
        };
    }
};

/**
 * Add a new sweet (Admin only)
 */
export const addSweet = async (sweetData) => {
    try {
        const response = await axios.post(`${API_URL}/add`, sweetData);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.error || error.message || 'Failed to add sweet'
        };
    }
};

/**
 * Update a sweet (Admin only)
 */
export const updateSweet = async (id, sweetData) => {
    try {
        const response = await axios.put(`${API_URL}/update/${id}`, sweetData);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.error || error.message || 'Failed to update sweet'
        };
    }
};

/**
 * Delete a sweet (Admin only)
 */
export const deleteSweet = async (id) => {
    try {
        await axios.delete(`${API_URL}/delete/${id}`);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.error || error.message || 'Failed to delete sweet'
        };
    }
};

/**
 * Upload an image file
 */
export const uploadImage = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post('http://localhost:8080/api/files/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return { success: true, url: response.data.url };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.error || error.message || 'Failed to upload image'
        };
    }
};

/**
 * Purchase a sweet
 */
export const purchaseSweet = async (id, quantity = 1) => {
    try {
        const response = await axios.post(`${API_URL}/purchase/${id}?quantity=${quantity}`);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.error || error.message || 'Failed to purchase sweet'
        };
    }
};
