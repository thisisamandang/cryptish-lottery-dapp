import Image from "next/image";
import React from "react";
import logo from "../public/logo.png";
import { useDisconnect, useAddress } from "@thirdweb-dev/react";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import NavButton from "./NavButton";
import { disconnect } from "process";
function Header() {
  const address = useAddress();
  const disconnect = useDisconnect();
  return (
    <header className="grid grid-cols-2 md:grid-cols-5 justify-between items-center p-5">
      <div className="flex items-center space-x-2">
        <Image className="h-20 w-20" src={logo} alt="" />

        <div>
          <h1 className="text-lg text-white font-bold">CRYPTISH</h1>
          <p className="text-xs text-emerald-100 truncate">
            User: {address?.substring(0, 5)}...
            {address?.substring(address.length, address.length - 5)}
          </p>
        </div>
      </div>
      <div className="hidden md:flex md:col-span-3 items-center justify-center rounded-md">
        <div className="bg-[#0c1216] p-4 space-x-2">
          <NavButton isActive title="Buy Tickets" />
          <NavButton onClick={disconnect} title="Logout" />
        </div>
      </div>
      <div className="flex flex-col ml-auto text-right">
        <Bars3BottomRightIcon className="h-8 w-8 mx-auto text-white cursor-pointer" />
        <span className="md:hidden">
          <NavButton onClick={disconnect} title="Logout" />
        </span>
      </div>
    </header>
  );
}
export default Header;
