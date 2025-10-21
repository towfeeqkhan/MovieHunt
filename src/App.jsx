import { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 z-60 left-0 lg:w-72 w-55 max-customSize:w-[50%] h-full bg-[#0F0F11] transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        <Sidebar />
      </div>

      {/* Overlay for small screens */}
      {isOpen && window.innerWidth < 900 && (
        <div
          className="fixed inset-0 bg-black/60  z-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div className="flex-1 lg:ml-72 ml-55 max-customSize:ml-0 min-w-0">
        {/* Header */}
        <div
          className="fixed top-0 lg:left-72 left-55 max-customSize:left-0 
          lg:w-[calc(100%_-_18rem)] w-[calc(100%_-_13.75rem)] 
          max-customSize:w-full h-24 z-50 bg-[#0F0F11]"
        >
          <Header toggleSidebar={() => setIsOpen((prev) => !prev)} />
        </div>

        {/* Page Content */}
        <div className="pt-24">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
