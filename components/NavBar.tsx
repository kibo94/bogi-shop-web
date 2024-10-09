"use client";
import React, { useEffect, useState } from "react";
import logo from "../public/assets/images/logo.png";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import "../styles/navbar.css";
import Image from "next/image";
import NavLinks from "./NavLinks";
import SideBar from "./SideBar";
import Link from "next/link";
import { User } from "next-auth";
function NavBar() {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const [providers, setProviders] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    async function fetchAdminUsers() {
      const response2 = await fetch(`/api/users/admin`);
      const users: User[] = await response2.json();

      if (users && users.find((user) => user.email == session?.user?.email)) {
        setIsAdmin(true);
      }
    }
    const setProvidersFn = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProvidersFn();
    if (session?.user) {
      fetchAdminUsers();
    }
  }, [session?.user]);

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

        <NavLinks closeSideBar={() => {}} isAdmin={isAdmin} />
        <div className="sm:flex hidden">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5 items-center">
              <button
                className="nav-link"
                type="button"
                onClick={() => {
                  signOut();
                }}
              >
                Sign Out
              </button>
              <Link href="/profile">
                <Image
                  src={session?.user.image!}
                  alt="profile"
                  width={37}
                  height={37}
                  className="rounded-full"
                />
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider: any) => (
                  <button
                    type="button"
                    className="nav-link"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
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
