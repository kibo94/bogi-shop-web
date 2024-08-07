import React from "react";
import NavLinks from "./NavLinks";
import logo from "../../public/assets/images/logo.png";
import Image from "next/image";
interface SideBarProps {
  isOpen: boolean;
  closeSideBarHandler: () => void;
}
function SideBar({ isOpen, closeSideBarHandler }: SideBarProps) {
  console.log(isOpen);
  var sideBarClass = "sidebar";
  if (isOpen) {
    sideBarClass += " open";
  }
  return (
    <div className={sideBarClass}>
      <div className="sidebar-links">
        <div className="flex justify-between items-center   sidebar-header">
          <Image src={logo} alt="logo" className="logo" />
          <svg
            onClick={() => closeSideBarHandler()}
            width="42"
            height="43"
            viewBox="0 0 42 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.2001 32.3246L9.96106 31.0856L19.7611 21.2856L9.96106 11.4856L11.2001 10.2466L21.0001 20.0466L30.8001 10.2466L32.0391 11.4856L22.2391 21.2856L32.0391 31.0856L30.8001 32.3246L21.0001 22.5246L11.2001 32.3246Z"
              fill="black"
            />
          </svg>
        </div>

        <NavLinks closeSideBar={() => closeSideBarHandler()} />
      </div>

      <div className="overlay" onClick={() => closeSideBarHandler()}></div>
    </div>
  );
}

export default SideBar;
