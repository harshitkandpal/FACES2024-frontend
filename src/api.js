import axios from 'axios';

const API_URL = 'http://13.234.118.246/api';

// User Authentication and Profile Management
export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/u/auth/login/`, credentials);
        return response.data; // Return data if successful
    } catch (error) {
        if (error.response) {
            console.error("Login error details:", error.response.data);
            throw new Error(`Login failed: ${error.response.data.detail || 'Unknown error'}`);
        } else {
            console.error("Login error:", error.message);
            throw new Error(`Login failed: ${error.message}`);
        }
    }
};

export const logout = async (token) => {
    try {
        const response = await axios.post(`${API_URL}/u/auth/logout/`, {}, {
            headers: { Authorization: `Token ${token}` }
        });
        return response.data; // Return data if successful
    } catch (error) {
        if (error.response) {
            console.error("Logout error details:", error.response.data);
            throw new Error(`Logout failed: ${error.response.data.detail || 'Unknown error'}`);
        } else {
            console.error("Logout error:", error.message);
            throw new Error(`Logout failed: ${error.message}`);
        }
    }
};

export const getUserDetails = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/u/me/`, {
            headers: { Authorization: `Token ${token}` }
        });
        return response.data; // Return data if successful
    } catch (error) {
        if (error.response) {
            console.error("Get user details error:", error.response.data);
            throw new Error(`Get user details failed: ${error.response.data.detail || 'Unknown error'}`);
        } else {
            console.error("Get user details error:", error.message);
            throw new Error(`Get user details failed: ${error.message}`);
        }
    }
};

export const updateUser = async (token, data) => {
    try {
        const response = await axios.post(`${API_URL}/u/update/`, data, {
            headers: { Authorization: `Token ${token}` }
        });
        return response.data; // Return data if successful
    } catch (error) {
        if (error.response) {
            console.error("Update user error details:", error.response.data);
            throw new Error(`Update user failed: ${error.response.data.detail || 'Unknown error'}`);
        } else {
            console.error("Update user error:", error.message);
            throw new Error(`Update user failed: ${error.message}`);
        }
    }
};

// Event Management
export const getEvents = async () => {
    try {
        const response = await axios.get(`${API_URL}/e/`);
        return response.data; // Return data if successful
    } catch (error) {
        if (error.response) {
            console.error("Get events error details:", error.response.data);
            throw new Error(`Get events failed: ${error.response.data.detail || 'Unknown error'}`);
        } else {
            console.error("Get events error:", error.message);
            throw new Error(`Get events failed: ${error.message}`);
        }
    }
};

export const getFeaturedEvents = async () => {
    try {
        const response = await axios.get(`${API_URL}/e/featured/`);
        return response.data; // Return data if successful
    } catch (error) {
        if (error.response) {
            console.error("Get featured events error details:", error.response.data);
            throw new Error(`Get featured events failed: ${error.response.data.detail || 'Unknown error'}`);
        } else {
            console.error("Get featured events error:", error.message);
            throw new Error(`Get featured events failed: ${error.message}`);
        }
    }
};

export const getEventDetails = async (eventCode) => {
    try {
        const response = await axios.get(`${API_URL}/e/${eventCode}/`);
        return response.data; // Return data if successful
    } catch (error) {
        if (error.response) {
            console.error("Get event details error details:", error.response.data);
            throw new Error(`Get event details failed: ${error.response.data.detail || 'Unknown error'}`);
        } else {
            console.error("Get event details error:", error.message);
            throw new Error(`Get event details failed: ${error.message}`);
        }
    }
};

export const registerForEvent = async (token, data) => {
    const payload = {
      event_code: data.event_code,
      team_name: data.team_name || 'SoloTeam',
      members: data.members,
    };
    
    console.log("Payload being sent:", payload); // Log the payload
    
    try {
        const response = await axios.post(
            `${API_URL}/e/register/`,
            payload,
            {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log("Registration successful:", response.data);
        return response.data; // Return data if successful
    } catch (error) {
        if (error.response) {
            console.error("Registration error details:", error.response.data); // Log the error details
            throw new Error(`Registration failed: ${error.response.data.detail || 'Unknown error'}`);
        } else {
            console.error("Registration error:", error.message);
            throw new Error(`Registration failed: ${error.message}`);
        }
    }
};

export const unregisterFromEvent = async (token, eventData) => {
    try {
        const response = await axios.post(`${API_URL}/e/unregister/`, eventData, {
            headers: { Authorization: `Token ${token}` }
        });
        return response.data; // Return data if successful
    } catch (error) {
        if (error.response) {
            console.error("Unregister error details:", error.response.data);
            throw new Error(`Unregister failed: ${error.response.data.detail || 'Unknown error'}`);
        } else {
            console.error("Unregister error:", error.message);
            throw new Error(`Unregister failed: ${error.message}`);
        }
    }
};
