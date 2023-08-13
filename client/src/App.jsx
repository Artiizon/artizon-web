import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Canvas from "./canvas";
import Customizor from "./pages/Customizor";
import Home from "./pages/Home";
import MakeOrder from "./pages/MakeOrder";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";

import UserManageMain from "./pages/UserManage/UserManageMain";

import { useSnapshot } from "valtio";
import state from "./store";

import CompanyDesign from './pages/CompanyDesign';
import CompanyDesViewMore from './pages/CompanyDesViewMore';
import ArtizonFeedback from './pages/ArtizonFeedback';
import StylistStatusUpdate from './pages/StylistStatusUpdate';
import StylistDashboard from './pages/StylistDashboard';
import StylistReviewOrders from './pages/StylistReviewOrders';
import DesignerDashboard from './pages/DesignerDashboard';
import DesignerDesigns from './pages/DesignerDesigns';
import AddNewDesign from './pages/AddNewDesign';
import ManagerDashboard from './pages/ManagerDashboard';
import StylistReviewAnOrder from './pages/StylistReviewAnOrder';

import { Header } from "./components";

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

import DesignerPortfolia from './pages/Portfolia/DesignerPortfolia';
import CustomerPortfolia from './pages/Portfolia/CustomerPortfolia';
import CustomerDetails from './pages/Portfolia/CustomerDetails';
import ChangePassword from './pages/ChangePassword';
import AddUsers from './pages/UserManage/AddUsers';
import CustomerOrderDetailsF from './pages/Orders/CustomerOrderDetailsF';

function App() {

  const snap = useSnapshot(state);

  return (
    <main className="app transition-all ease-in">
 
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customizor" element={<Customizor />} />
          <Route path="/makeorder" element={<MakeOrder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route exact path="/company-design" element={<CompanyDesign/>}/>
          <Route exact path="/com-design-view-more" element={<CompanyDesViewMore/>}/>
          <Route exact path="/company-feedback" element={<ArtizonFeedback/>}/>
          <Route exact path="/order-status-update" element={<StylistStatusUpdate/>}/>
          <Route exact path="/stylist-dash" element={<StylistDashboard/>}/>
          <Route exact path="/review-order" element={<StylistReviewOrders/>}/>
          <Route exact path="/designer-dash" element={<DesignerDashboard/>}/>
          <Route exact path="/review-an-order" element={<StylistReviewAnOrder/>}/>
          <Route exact path="/des-design" element={<DesignerDesigns/>}/>
          <Route exact path="/new-design" element={<AddNewDesign/>}/>
          <Route exact path="/manager-dash" element={<ManagerDashboard/>}/>
          <Route exact path="/usermanage" element={<UserManageMain />}/>
          <Route exact path="/designerPortfolia" element={<DesignerPortfolia />}/>
          <Route exact path="/customerPortfolia" element={<CustomerPortfolia />}/>
          <Route exact path="/customerdetails" element={<CustomerDetails />}/>
          <Route exact path="/changePassword" element={<ChangePassword />}/>
          <Route exact path="/addUser" element={<AddUsers />}/>
          <Route exact path="/customerOrderDetailsF/" element={<CustomerOrderDetailsF /> }/>



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
      {snap.page === 'no-canvas' ||( <Canvas /> )}
    </main>
  )
  }



export default App;
