import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import React from "react";
import { BarLoader } from "react-spinners";
function Loading() {
  return (
    <div className="bg-[#0c1216] h-screen flex flex-col items-center justify-center">
      <RocketLaunchIcon className="h-14 w-14 mb-10 text-white" />;
      <BarLoader color="white" />
    </div>
  );
}

export default Loading;
