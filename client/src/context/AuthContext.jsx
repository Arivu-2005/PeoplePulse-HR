import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { demoUsers } from '../services/mockStore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('peoplepulse_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      const token = localStorage.getItem('peoplepulse_token');
      if (token) {
        try {
          const res = await api.get('/auth/me');
          if (res?.data?.user) {
            setUser(res.data.user);
            localStorage.setItem('peoplepulse_user', JSON.stringify(res.data.user));
          }
        } catch (err) {
          console.warn('Syncing user from local session storage:', err.message);
        }
      }
      setLoading(false);
    };
    fetchMe();
  }, []);

  const login = async (email, password) => {
    const normalizedEmail = (email || '').trim().toLowerCase();
    const normalizedPass = (password || '').trim();

    try {
      const res = await api.post('/auth/login', { email: normalizedEmail, password: normalizedPass });
      if (res?.data?.success) {
        localStorage.setItem('peoplepulse_token', res.data.token);
        localStorage.setItem('peoplepulse_user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        return res.data;
      }
    } catch (err) {
      // If server is unreachable or 404 (pure static hosting without Node backend), authenticate directly via demo users
      const isValidPassword =
        normalizedPass === 'Password123!' ||
        normalizedPass.toUpperCase() === 'PASSWORD123!';

      const matched = demoUsers.find((u) => u.email.toLowerCase() === normalizedEmail);

      if (matched && isValidPassword) {
        const authData = {
          success: true,
          token: matched.token,
          user: matched,
        };
        localStorage.setItem('peoplepulse_token', authData.token);
        localStorage.setItem('peoplepulse_user', JSON.stringify(authData.user));
        setUser(authData.user);
        return authData;
      }

      throw new Error(err.response?.data?.message || 'Invalid email or password');
    }
  };

  const logout = () => {
    localStorage.removeItem('peoplepulse_token');
    localStorage.removeItem('peoplepulse_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
