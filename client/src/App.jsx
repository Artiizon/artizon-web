import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "@fontsource/montserrat";
import Home from './pages/Home';
import Item from './pages/Item';
import Help from './pages/Price';
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
            <Route exact path="/stock" element={<Stock/>}/>
            <Route exact path="/stock/:id" element={<StockDetailsPage/>} />
            <Route exact path="/stock/:id/update" element={<StockUpdatePage/>} />
            <Route exact path="/stock/new" element={<StockNew/>} />
            <Route exact path="/home" element={<Home/>}/>
            <Route exact path="/tpm_review_orders" element={<Tpm_review_orders/>}/>
            <Route exact path="/item-types/:item_name_id" element={<Item_Type/>}/>
            <Route exact path="/item-colors/:item_type_id" element={<Item_Colors/>}/>
            <Route exact path="/textileProManagerdashboard" element={<TextileProManagerdashboard/>}/>
    
        </Routes>
      </Router>
    </div>
     );
}



export default App;
