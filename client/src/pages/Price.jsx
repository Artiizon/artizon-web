import StandardLayout from "../components/layout/StandardLayout";
import { useSnapshot } from "valtio";
import state from "../store";


function Price() {
  const snap = useSnapshot(state);
  state.page = "no-canvas";

  return (
  
          <StandardLayout>
              <div className="min-h-screen mt-10">
                   Price
              </div>          
          </StandardLayout>
  
  );
}

export default Price