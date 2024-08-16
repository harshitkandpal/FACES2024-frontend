import { createContext, useState, useEffect, useContext } from 'react';
import { getUserDetails } from './api';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token') || null,
    user: null,
    isAuthenticated: !!localStorage.getItem('token'),
  });

  // Fetch user details when token exists
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = authState.token;
      if (token) {
        try {
          const response = await getUserDetails(token);
          if (response && response.data && response.data.user) {
            setAuthState((prevState) => ({
              ...prevState,
              user: response.data.user,
              isAuthenticated: true,
            }));
          } else {
            console.error('User data is missing in response');
            logout(); // Logout if user data is missing
          }
        } catch (error) {
          console.error('Failed to fetch user details', error);
          logout(); // Logout on error (e.g., token is invalid or expired)
        }
      }
    };
    fetchUserDetails();
  }, [authState.token]);

  const login = (token, user) => {
    // Store token in localStorage and update state
    localStorage.setItem('token', token);

    setAuthState({
      token,
      user: user || null, // Set user immediately if available
      isAuthenticated: true,
    });

    // Optionally, fetch user details again if you haven't received the user data from the login response
    if (!user) {
      fetchUserDetails(token);
    }
  };

  const fetchUserDetails = async (token) => {
    try {
      const response = await getUserDetails(token);
      if (response && response.data && response.data.user) {
        setAuthState((prevState) => ({
          ...prevState,
          user: response.data.user,
        }));
      } else {
        console.error('User data is missing in response');
      }
    } catch (error) {
      console.error('Failed to fetch user details after login', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
