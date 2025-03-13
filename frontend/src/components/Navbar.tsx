import { FC } from "react";

const Navbar: FC = () => {
  return (
    <header className="bg-black text-white h-32 flex items-center justify-center">
    <h1 className="text-4xl font-extrabold text-center flex items-center space-x-2">
        <span className="text-blue-500">🚀</span>{" "}
        <span className="text-[#4EA8DE]">Todo</span>{" "}
        <span className="text-[#5E60CE]">App</span>
      </h1>      
    </header>
  );
};

export default Navbar;
