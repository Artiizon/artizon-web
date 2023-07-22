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
         </Routes> 
     </Router> 
  </div>


    )
}

export default App
