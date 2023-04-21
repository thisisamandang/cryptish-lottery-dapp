import React from "react";

interface Props {
  title: string;
  isActive?: boolean;
  onClick?: () => void;
}

function NavButton({ title, isActive, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`${
        isActive && "bg-[#2b323b]"
      } border border-[#21262d] hover:border-slate-300 transition duration-150 ease-in-out text-white font-bold py-2 px-4 rounded`}
    >
      {title}
    </button>
  );
}

export default NavButton;
