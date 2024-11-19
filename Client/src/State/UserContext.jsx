
import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('name');
        if (token) {
            const userData = { token, name, isAdmin: JSON.parse(localStorage.getItem('isAdmin')) };
            setUser(userData);
        }
        setLoading(false); 
    }, []);

    const login = (userData) => {
        localStorage.setItem('token', userData.token);
        localStorage.setItem('isAdmin', JSON.stringify(userData.isAdmin));
        localStorage.setItem('userId', userData.userId);
        localStorage.setItem('name', userData.name);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};
export const useUser = () => useContext(UserContext);
