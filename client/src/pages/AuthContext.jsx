import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie library

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // Load login state and username from cookies when the component mounts
  useEffect(() => {
    const storedIsLoggedIn = Cookies.get('isLoggedIn') === 'true';
    const storedUserName = Cookies.get('userName') || '';

    setIsLoggedIn(storedIsLoggedIn);
    setUserName(storedUserName);
  }, []);

  // Logout function to clear login state and username from cookies
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    Cookies.remove('isLoggedIn');
    Cookies.remove('userName');
  };
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userName, setUserName, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
