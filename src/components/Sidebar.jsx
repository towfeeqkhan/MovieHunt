import { FaClapperboard } from "react-icons/fa6";
import { FaCompass } from "react-icons/fa";
import { BsFire } from "react-icons/bs";
import { Link, NavLink } from "react-router";

function Sidebar() {
  return (
    <div className="h-screen bg-[#0F0F11] text-white border-r border-[#1F1F1F]">
      <div className="flex items-center gap-3 pl-5 pt-8">
        <FaClapperboard size={32} color="#AC1A19" />
        <Link to="/">
          <p className="font-bold text-lg">
            Movie <span className="text-[#AC1A19]">Hunt</span>
          </p>
        </Link>
      </div>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center gap-4 mt-16 mx-3 pl-3 py-3 rounded-full transition-all duration-300 ${
            isActive ? "bg-[#AC1A19] text-white" : "hover:bg-[#AC1A19]"
          }`
        }
      >
        <FaCompass size={26} />
        <p className="font-bold text-[16px]">Browse</p>
      </NavLink>
    </div>
  );
}

export default Sidebar;
