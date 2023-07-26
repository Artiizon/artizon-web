import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import "@fontsource/montserrat"; 
import Home from './pages/Home';
import DesignLab from './pages/DesignLab';
import Contact from './pages/Contact';
import Help from './pages/Help';
import CompanyDesign from './pages/CompanyDesign';
import Login from './pages/Login';
import CompanyDesViewMore from './pages/CompanyDesViewMore';
import ArtizonFeedback from './pages/ArtizonFeedback';
import StylistStatusUpdate from './pages/StylistStatusUpdate';
import StylistDashboard from './pages/StylistDashboard';
import StylistReviewOrders from './pages/StylistReviewOrders';
import DesignerDashboard from './pages/DesignerDashboard';
import DesignerDesigns from './pages/DesignerDesigns';
import AddNewDesign from './pages/AddNewDesign';
import ManagerDashboard from './pages/ManagerDashboard';

import './App.css'

function App() {

  return (
    <div>
    <Router>
         <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/design-labs" element={<DesignLab/>}/>
            <Route exact path="/company-design" element={<CompanyDesign/>}/>
            <Route exact path="/contact" element={<Contact/>}/>
            <Route exact path="/help" element={<Help/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/com-design-view-more" element={<CompanyDesViewMore/>}/>
            <Route exact path="/company-feedback" element={<ArtizonFeedback/>}/>
            <Route exact path="/order-status-update" element={<StylistStatusUpdate/>}/>
            <Route exact path="/stylist-dash" element={<StylistDashboard/>}/>
            <Route exact path="/review-order" element={<StylistReviewOrders/>}/>
            <Route exact path="/designer-dash" element={<DesignerDashboard/>}/>
            <Route exact path="/des-design" element={<DesignerDesigns/>}/>
            <Route exact path="/new-design" element={<AddNewDesign/>}/>
            <Route exact path="/manager-dash" element={<ManagerDashboard/>}/>
            
 
         </Routes> 
     </Router> 
  </div>


    )
}

export default App
