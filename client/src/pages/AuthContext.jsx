import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie library

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load login state and username from cookies when the component mounts
  useEffect(() => {
    const storedIsLoggedIn = Cookies.get('isLoggedIn') === 'true';
    const storedUserName = Cookies.get('userName') || '';
    const storedUserType = Cookies.get('userType');

      const IsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
      const storedUName = localStorage.getItem('userName') || '';
      const storedUType = localStorage.getItem('userType');
  


    setIsLoggedIn(storedIsLoggedIn);
    setUserName(storedUserName);
    setUserType(storedUserType);
    
    setIsLoggedIn(IsLoggedIn);
    setUserName(storedUName);
    setUserType(storedUType);
    
    setIsLoading(false);
  }, []);

  // Logout function to clear login state and username from cookies
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setUserType('');
    Cookies.remove('isLoggedIn');
    Cookies.remove('userName');
    Cookies.remove('userType');
    // Remove the authentication token cookie
   // Cookies.remove('authToken');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userType');
  };
  
  return (
    <AuthContext.Provider value={{ isLoading, isLoggedIn, setIsLoggedIn, userName, setUserName, handleLogout, userType, setUserType }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
