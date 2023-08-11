import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {useAuth } from './pages/AuthContext'; 
import "@fontsource/montserrat";
import Home from './pages/Home';
import Item from './pages/Item';
import Help from './pages/Price';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Stock from './pages/Stock';
import StockDetailsPage from './pages/StockDetails';
import StockUpdatePage from './pages/StockUpdate';
import StockNew from './pages/StockNew';
import TextileProManagerdashboard from './pages/textileProManagerdashboard';
import './App.css';
import Tpm_review_orders from './pages/tpm_review_orders';
import Item_Type from './pages/Item_Type'; 
import Item_Colors from './pages/Item_Color';

function App() {
  return (
   
    <div>
      <Router>
      
          <Routes>
       
          <Route exact path="/" element={<Home/>}/>
            <Route exact path="/item" element={<Item/>}/>
            <Route exact path="/help" element={<Help/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/stock" element={<Stock/>}/>
            <Route exact path="/stock/:id" element={<StockDetailsPage/>} />
            <Route exact path="/stock/:id/update" element={<StockUpdatePage/>} />
            <Route exact path="/stock/new" element={<StockNew/>} />
            <Route exact path="/Signup" element={<Signup/>}/>
            <Route exact path="/home" element={<Home/>}/>
            <Route exact path="/tpm_review_orders" element={<Tpm_review_orders/>}/>
            <Route exact path="/item-types/:item_name_id" element={<Item_Type/>}/>
            <Route exact path="/item-colors/:item_type_id" element={<Item_Colors/>}/>
            

            <Route exact path="/textileProManagerdashboard" element={<TextileProManagerdashboard/>}/>
          
            

{/* 
            1: '/home',
            2: '/designer',
            3: '/admin',
            4: '/stylist',
            5: '/textileProManagerdashboard', */}




            {/* Protected routes (requires authentication and role-based authorization) */}
            {/* <Route
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
            /> */}

            {/* Add other protected routes here with their corresponding roles */}
            {/* For example, to create an admin-only route: */}
            {/* <Route path="/admin-only" element={<AdminOnlyPage />} /> */}

            {/* Add a catch-all route for unknown paths */}
            {/* <Route path="*" element={<Navigate to="/" />} />
             */}

          </Routes>
      </Router>
    </div>
     );
}


// const isAuthenticated = () => {
//   //const token = localStorage.getItem('authToken');
//   const token =Cookies.get('authToken');

//   if (token) {
//     // Decode the token to get user information
//     const decodedToken = jwt_decode(token);
//     const currentTime = Math.floor(Date.now() / 1000);
//     console.log("tt",token);

//     // Check if the token has expired
//     if (decodedToken.exp < currentTime) {
//       return false;
//     }

//     return true;
//   }

  // else if (token2) {
  //   // Decode the token to get user information
  //   const decodedToken = jwt_decode(token2);
  //   const currentTime = Math.floor(Date.now() / 1000);
  //   console.log("tt",token2);

  //   // Check if the token has expired
  //   if (decodedToken.exp < currentTime) {
  //     return false;
  //   }

  //   return true;
  // }


//   return false;
// };

// // Custom PrivateRoute component for role-based authentication
// function PrivateRoute({ children, roles }) {
//   const { isLoggedIn, userType, userName, isLoading } = useAuth();
//  // const authenticated = isAuthenticated();

//   console.log("App.js isLoggedIn:",isLoggedIn);
//   console.log("App.js userType:",userType);
//  // console.log("authenticated:",authenticated);
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   // Check if the user is logged in and has the required role
//   const isAuthorized = isLoggedIn && (!roles || roles.includes(userType));

//   return isAuthorized ? children : <Navigate to="/login" />;
// }

export default App;
