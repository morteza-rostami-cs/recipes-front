import React from "react";
import logoSrc from "../assets/logo2.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="font-bold text-2xl text-gray-800">
      <img src={logoSrc} className="size-38" />
    </Link>
  );
};

export default Logo;
