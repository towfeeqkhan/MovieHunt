import { CiSearch, CiBellOn } from "react-icons/ci";
import Avatar from "../assets/avatar.png";

function Header() {
  return (
    <div className="flex items-center justify-end gap-8 h-24 bg-[#0F0F11] text-white">
      <div className="flex items-center space-x-3 border border-[#252527] w-[250px] px-4 py-3 rounded-[24px] ">
        <CiSearch size={24} />
        <input
          className="flex-1 py-1 outline-none"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="cursor-pointer">
        <CiBellOn size={30} />
      </div>
      <div className="mr-10">
        <img className="h-11 cursor-pointer" src={Avatar} alt="avatar" />
      </div>
    </div>
  );
}

export default Header;
