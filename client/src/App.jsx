import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import "@fontsource/montserrat";
import Home from './pages/Home';
import Contact from './pages/Contact';
import Help from './pages/Help';

import Login from './pages/Login';

import Stock from './pages/Stock';

import StockDetailsPage from './pages/StockDetails';

import StockUpdatePage from './pages/StockUpdate';
import StockNew from './pages/StockNew';



import './App.css'

function App() {

  return (
    <div>
    <Router>
         <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/contact" element={<Contact/>}/>
            <Route exact path="/help" element={<Help/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/stock" element={<Stock/>}/>
            <Route exact path="/stock/:id" element={<StockDetailsPage/>} />
            <Route exact path="/stock/:id/update" element={<StockUpdatePage/>} />
            <Route exact path="/stock/new" element={<StockNew/>} />
 
         </Routes> 
     </Router> 
  </div>


    )
}

export default App
