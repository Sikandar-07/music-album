import StickyHeadTable from "./components/Table/Table";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen">
        <StickyHeadTable />
      </div>
    </>
  );
}

export default App;
