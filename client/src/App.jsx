import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Canvas from "./canvas";
import Customizor from "./pages/Customizor";
import Home from "./pages/Home";
import MakeOrder from "./pages/MakeOrder";
import MakeOrderDesign from "./pages/MakeOrderDesign";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import CustomerOrders from "./pages/CustomerOrders";
import CustomerOrderViewMore from "./pages/CustomerOrderViewMore";
import CustomerViewTshirt from "./pages/CustomerViewTshirt";
import PaymentForm from "./pages/PaymentForm";
import CustomerProfile from "./pages/CustomerProfile";
import ForgotPassword from "./pages/ForgotPassword";
import UserManageMain from "./pages/UserManage/UserManageMain";
import ForgotPasswordChange from "./pages/ForgotPasswordChange";
import CustomizorHelp from "./pages/Help";

import { useSnapshot } from "valtio";
import state from "./store";

import CompanyDesign from './pages/CompanyDesign';
import CompanyDesViewMore from './pages/CompanyDesViewMore';
import ArtizonFeedback from './pages/ArtizonFeedback';
import StylistStatusUpdate from './pages/StylistStatusUpdate';
import StylistDashboard from './pages/StylistDashboard';
import DesignerDashboard from './pages/DesignerDashboard';
import DesignerDesigns from './pages/DesignerDesigns';
import AddNewDesign from './pages/AddNewDesign';
import ManagerReviewAnOrder from './pages/ManagerReviewAnOrder';

import StylistReviewOrders from './pages/StylistReviewOrders';
import StylistReviewAnOrder from  './pages/StylistReviewAnOrder';

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
import StylistViewOrderForm from "./pages/StylistViewMoreOrder";

import ManagerViewOrderForm from "./pages/ManagerViewMoreOrder";

import DesignerPortfolia from './pages/Portfolia/DesignerPortfolia';
import CustomerPortfolia from './pages/Portfolia/CustomerPortfolia';
import CustomerDetails from './pages/Portfolia/CustomerDetails';
import ChangePassword from './pages/ChangePassword';
import AddUsers from './pages/UserManage/AddUsers';
import CustomerOrderDetailsF from './pages/Orders/CustomerOrderDetailsF';
import Footer from "./components/footer/Footer";
import LoginError from "./pages/LoginError";
import PricePage from "./pages/Price";
import ManagerDetails from "./pages/ManagerDetails";
import StylistDetails from "./pages/StylistDetails";
import DesignerDetails from "./pages/DesignerDetails";

import AddNewSupplier from "./pages/AddNewSupplier";
import AddNewItem from "./pages/AddNewItem";
import BlockUserManageMain from "./pages/UserManage/BlockUserManageMain";
import StockLevel from "./pages/StockLevel";
import ViewSupplier from "./pages/ViewSupplier";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51MxM0YFreLlEoqoAeH0F3pkVu0M9OKo55p00CZCuYgAeVjMrPs55JVL40UZTPNeapYuzxAn50uH67VpbdkBpobpt00nHKcySE9');


function App() {

  const snap = useSnapshot(state);
  const excludedRoutes = ['/', '/customizor'];

  return (
    <Elements stripe={stripePromise}>
    <main className="app transition-all ease-in">
 
      <Router>
        <Header />
          
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customizor" element={<Customizor />} />
          <Route path="/makeorder" element={<MakeOrder />} />
          <Route path="//makeOrderDesign/:id" element={<MakeOrderDesign />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/customerorders/:customerId" element={<CustomerOrders />} />
          <Route path="/customerorder-view-more/:id/:status/:color/:material/:customerID" element={<CustomerOrderViewMore />} />
          <Route path="/customerorder-view-tshirt" element={<CustomerViewTshirt />} />
          <Route path="/payment-form/:fee" element={<PaymentForm />} />
          <Route path="/customerprofile/:customerId" element={<CustomerProfile />} />
          <Route exact path="/company-design" element={<CompanyDesign/>}/>
          <Route exact path="/com-design-view-more/:id" element={<CompanyDesViewMore/>}/>
          <Route exact path="/company-feedback" element={<ArtizonFeedback/>}/>
          <Route exact path="/order-status-update" element={<StylistStatusUpdate/>}/>
          <Route exact path="/stylist-dash" element={<StylistDashboard/>}/>
          <Route exact path="/review-order" element={<StylistReviewOrders/>}/>
          <Route exact path="/designer-dash" element={<DesignerDashboard/>}/>
          <Route exact path="/review-an-order/:id" element={<StylistReviewAnOrder/>}/>
          <Route exact path="/designer-dash" element={<DesignerDashboard/>}/>
          <Route exact path="/des-design" element={<DesignerDesigns/>}/>
          <Route exact path="/new-design" element={<AddNewDesign/>}/>
          <Route exact path="/usermanage" element={<UserManageMain />}/>
          <Route exact path="/blockusermanage" element={<BlockUserManageMain />}/>
          <Route exact path="/designerPortfolia" element={<DesignerPortfolia />}/>
          <Route exact path="/customerPortfolia/:id" element={<CustomerPortfolia />}/>
          <Route exact path="/profile" element={<CustomerDetails />}/>
          <Route exact path="/managerprofile" element={<ManagerDetails />}/>
          <Route exact path="/stylistprofile" element={<StylistDetails />}/>
          <Route exact path="/designerprofile" element={<DesignerDetails />}/>
          <Route exact path="/customizorhelp" element={<CustomizorHelp />}/>
          
          
          <Route exact path="/changePassword" element={<ChangePassword />}/>
          <Route exact path="/addUser" element={<AddUsers />}/>
          <Route exact path="/customerOrderDetailsF/" element={<CustomerOrderDetailsF /> }/>
          <Route exact path="/review-an-ordertpm/:id" element={<ManagerReviewAnOrder/>}/>
          <Route exact path="/stylist-view-order/:id" element={<StylistViewOrderForm/>}/>
          <Route exact path="/forgot-password-change/:email" element={<ForgotPasswordChange />} />

       
          <Route exact path="/manager-view-order/:id" element={<ManagerViewOrderForm/>}/>

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
          <Route exact path="/login-error" element={<LoginError/>}/>
    
                  
          <Route exact path="/supplier/new" element={<AddNewSupplier/>}/>
          <Route exact path="/Item/new" element={<AddNewItem/>}/>
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/price" element={<PricePage/>}/>
          <Route exact path="/stocklevel" element={<StockLevel/>}/>
          <Route exact path="/supplier/view" element={<ViewSupplier/>}/>
          
        
          <Route path="/customerPortfolia/:customerId" element={<CustomerPortfolia />} />

        </Routes>
       
        {excludedRoutes.includes(window.location.pathname) ? null : <Footer />}
      </Router>
      {snap.page === 'no-canvas' ||( <Canvas /> )}
    </main>
    </Elements>
  )
  }



export default App;
