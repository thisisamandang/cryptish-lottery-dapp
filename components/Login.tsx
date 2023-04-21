import React from "react";
import Image from "next/image";
import logo from "../public/logo.png";
import NavButton from "./NavButton";
import { ConnectWallet } from "@thirdweb-dev/react";

function Login() {
  return (
    <div className="bg-[#0c1216] min-h-screen flex flex-col items-center justify-center text-center">
      <div className="flex flex-col items-center mb-10">
        <Image className=" h-56 w-56 mb-10" src={logo} alt="Logo" />
        <h1 className="text-5xl text-white mb-10 font-bold">
          CRYPTISH LOTTERY
        </h1>
        <ConnectWallet
          className=" !bg-[#2b323b] !border !border-[#21262d] hover:!border-slate-300 !transition !duration-150 !ease-in-out !text-white"
          btnTitle="Connect Using Metamask"
        />
      </div>
    </div>
  );
}

export default Login;
