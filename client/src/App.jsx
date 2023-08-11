import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Canvas from "./canvas";
import Customizor from "./pages/Customizor";
import Home from "./pages/Home";
import MakeOrder from "./pages/MakeOrder";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";

import { useSnapshot } from "valtio";
import state from "./store";
import "@fontsource/montserrat"; 
import Contact from './pages/Contact';
import Help from './pages/Help';
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
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/company-design" element={<CompanyDesign/>}/>
          <Route exact path="/contact" element={<Contact/>}/>
          <Route exact path="/help" element={<Help/>}/>
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
        </Routes>
      </Router>
      {snap.page === 'no-canvas' ||( <Canvas /> )}
    </main>
  )
}

export default App
