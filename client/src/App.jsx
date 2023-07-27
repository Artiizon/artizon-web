import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {useAuth,AuthProvider } from './pages/AuthContext'; 
import "@fontsource/montserrat";
import Home from './pages/Home';
import Contact from './pages/Contact';
import Help from './pages/Help';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Stock from './pages/Stock';
import StockDetailsPage from './pages/StockDetails';
import StockUpdatePage from './pages/StockUpdate';
import StockNew from './pages/StockNew';
import TextileProManagerdashboard from './pages/TextileProManagerdashboard';
import './App.css';

function App() {
  return (
    <AuthProvider>
    <div>
      <Router>
      
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help" element={<Help />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

{/* 
            1: '/home',
            2: '/designer',
            3: '/admin',
            4: '/stylist',
            5: '/textileProManagerdashboard', */}




            {/* Protected routes (requires authentication and role-based authorization) */}
            <Route
              path="/stock"
              element={
                <PrivateRoute roles={[5]}>
                  <Stock />
                </PrivateRoute>
              }
            />
            <Route
              path="/stock/:id"
              element={
                <PrivateRoute roles={[5]}>
                  <StockDetailsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/stock/:id/update"
              element={
                <PrivateRoute roles={[5]}>
                  <StockUpdatePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/stock/new"
              element={
                <PrivateRoute roles={[5]}>
                  <StockNew />
                </PrivateRoute>
              }
            />
            <Route
              path="/textileProManagerdashboard"
              element={
                <PrivateRoute roles={[5]}>
                  <TextileProManagerdashboard />
                </PrivateRoute>
              }
            />

            {/* Add other protected routes here with their corresponding roles */}
            {/* For example, to create an admin-only route: */}
            {/* <Route path="/admin-only" element={<AdminOnlyPage />} /> */}

            {/* Add a catch-all route for unknown paths */}
            {/* <Route path="*" element={<Navigate to="/" />} />
             */}

          </Routes>
      </Router>
    </div>
    </AuthProvider>
  );
}

// Custom PrivateRoute component for role-based authentication
function PrivateRoute({ children, roles }) {
  const { isLoggedIn, userType, userName, isLoading } = useAuth();
  console.log("Hannah");
  console.log("Kama:",isLoggedIn);
  console.log("george:",userType);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check if the user is logged in and has the required role
  const isAuthorized = isLoggedIn && (!roles || roles.includes(userType));

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default App;
