import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="flex">
      <div className="fixed top-0 z-60 left-0 w-72 h-full">
        <Sidebar />
      </div>
      <div className="flex-1 ml-72 min-w-0">
        <div className="fixed top-0 left-72 w-[calc(100%_-_18rem)] h-24 z-50">
          <Header />
        </div>
        <div className="pt-24">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
