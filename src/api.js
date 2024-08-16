import axios from 'axios';

const API_URL = 'http://13.234.118.246/api';

// User Authentication and Profile Management
export const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/u/auth/login/`, credentials);
      // Ensure the response contains expected data
      if (response.status === 200) {
        const { token, user } = response.data;
        return { token, user };
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Re-throw the error to be handled by the calling function
    }
  };
  

export const logout = async (token) => {
    return axios.post(`${API_URL}/u/auth/logout/`, {}, {
        headers: { Authorization: `Token ${token}` }
    });
};

export const getUserDetails = async (token) => {
    return axios.get(`${API_URL}/u/me/`, {
        headers: { Authorization: `Token ${token}` }
    });
};

export const updateUser = async (token, data) => {
    return axios.post(`${API_URL}/u/update/`, data, {
        headers: { Authorization: `Token ${token}` }
    });
};

// Event Management
export const getEvents = async () => {
    return axios.get(`${API_URL}/e/`);
};

export const getFeaturedEvents = async () => {
    return axios.get(`${API_URL}/e/featured/`);
};

export const getEventDetails = async (eventCode) => {
    return axios.get(`${API_URL}/e/${eventCode}/`);
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
      return response.data; // Return the response data if successful
    } catch (error) {
      if (error.response) {
        console.error("Error details:", error.response.data); // Log the error details
        return error.response.data; // Return the error response data for further handling
      } else {
        console.error("Error:", error.message);
        throw new Error(error.message); // Throw the error if no response is available
      }
    }
  };
  
  
  


export const unregisterFromEvent = async (token, eventData) => {
    return axios.post(`${API_URL}/e/unregister/`, eventData, {
        headers: { Authorization: `Token ${token}` }
    });
};



// Additional functions for other operations can be added here

