import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Home from './pages/Home';
import Store from './pages/Store';
import Social from './pages/Social';
import Contact from './pages/Contact';
import Help from './pages/Help';

import Login from './pages/Login';

import './App.css'

function App() {

  return (
    <div className="r">
    <Router>
         <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/store" element={<Store/>}/>
            <Route exact path="/social" element={<Social/>}/>
            <Route exact path="/contact" element={<Contact/>}/>
            <Route exact path="/help" element={<Help/>}/>
            <Route exact path="/login" element={<Login/>}/>
 
         </Routes> 
     </Router> 
  </div>


    )
}

export default App
