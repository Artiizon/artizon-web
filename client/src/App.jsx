import Canvas from "./canvas";
import Customizor from "./pages/Customizor";
import Home from "./pages/Home";

function App() {

  return (
    <main className="app transition-all ease-in">
      <Home />
      <Canvas />
      <Customizor />
    </main>
  )
}

export default App
