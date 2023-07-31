import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Home from './pages/Home';
import Store from './pages/Store';
import Social from './pages/Social';
import Contact from './pages/Contact';
import Help from './pages/Help';
import UserManageMain from "./pages/UserManage/UserManageMain";

import Login from './pages/Login';

import './App.css'
import DesignerPortfolia from './pages/Portfolia/DesignerPortfolia';
import CustomerPortfolia from './pages/Portfolia/CustomerPortfolia';
import CustomerDetails from './pages/Portfolia/CustomerDetails';
import ChangePassword from './pages/ChangePassword';
import AddUsers from './pages/UserManage/AddUsers';
import CustomerOrderDetails from './pages/Orders/CustomerOrderDetails';

function App() {

  return (
    <div>
    <Router>
         <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/store" element={<Store/>}/>
            <Route exact path="/social" element={<Social/>}/>
            <Route exact path="/contact" element={<Contact/>}/>
            <Route exact path="/help" element={<Help/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/usermanage" element={<UserManageMain />}/>
            <Route exact path="/designerPortfolia" element={<DesignerPortfolia />}/>
            <Route exact path="/customerPortfolia" element={<CustomerPortfolia />}/>
            <Route exact path="/customerdetails" element={<CustomerDetails />}/>
            <Route exact path="/changePassword" element={<ChangePassword />}/>
            <Route exact path="/addUser" element={<AddUsers />}/>
            <Route exact path="/customerOrderDetails/" element={<CustomerOrderDetails />}/>
         </Routes> 
     </Router> 
  </div>


    )
}

export default App
