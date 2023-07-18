import Canvas from "./canvas";
import Customizor from "./pages/Customizor";
import Home from "./pages/Home";
import MakeOrder from "./pages/MakeOrder";

import { useSnapshot } from "valtio";
import state from "./store";

function App() {

  const snap = useSnapshot(state);

  return (
    <main className="app transition-all ease-in">
      <Home />

      {snap.page === 'makeorder' || (
        <Canvas />
      )}
      
      <Customizor />
      <MakeOrder />
    </main>
  )
}

export default App
