import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Canvas from "./canvas";
import Customizor from "./pages/Customizor";
import Home from "./pages/Home";
import MakeOrder from "./pages/MakeOrder";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { useSnapshot } from "valtio";
import state from "./store";

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
        </Routes>
      </Router>
      {snap.page === 'no-canvas' ||( <Canvas /> )}
    </main>
  )
}

export default App
