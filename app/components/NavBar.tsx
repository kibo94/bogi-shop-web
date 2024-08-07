"use client";
import React, { useState } from "react";
import logo from "../../public/assets/images/logo.png";
import "../styles/navbar.css";
import Image from "next/image";
import NavLinks from "./NavLinks";
import SideBar from "./SideBar";
function NavBar() {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  return (
    <div className="navbar z-30">
      <SideBar
        isOpen={isSideBarOpen}
        closeSideBarHandler={() => {
          setIsSideBarOpen(false);
        }}
      />
      <div className="container flex justify-between items-center">
        <Image src={logo} alt="logo" className="logo" />
        <NavLinks closeSideBar={() => {}} />
        <div className="burger" onClick={() => setIsSideBarOpen(true)}>
          <svg
            width="40"
            height="41"
            viewBox="0 0 40 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.66675 29.0689V27.4022H33.3334V29.0689H6.66675ZM6.66675 21.1189V19.4522H33.3334V21.1189H6.66675ZM6.66675 13.1689V11.5022H33.3334V13.1689H6.66675Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
