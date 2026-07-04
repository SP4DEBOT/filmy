import React from "react";
import Logo from "../assets/logo.png";
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex border space-x-8 items-center pl-3 gap-4 py-4">
      <img className="w-[50px] rounded-full" src={Logo} alt="Logo" />

      <Link to="/" className="text-blue-500 font-bold text-3xl"> Movies </Link>

      <Link to="/watchlist" className="text-blue-500 font-bold text-3xl"> Watchlist </Link>

    </div>
  );
};

export default Navbar;
