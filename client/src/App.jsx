import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import "@fontsource/montserrat"; 
import Home from './pages/Home';
import DesignLab from './pages/DesignLab';
import Contact from './pages/Contact';
import Help from './pages/Help';
import CompanyDesign from './pages/CompanyDesign';
import Login from './pages/Login';
import CompanyDesViewMore from './pages/CompanyDesViewMore';

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
 
         </Routes> 
     </Router> 
  </div>


    )
}

export default App
