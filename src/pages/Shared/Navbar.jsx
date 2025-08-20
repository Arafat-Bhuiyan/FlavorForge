import React from "react";
import logo from "/FlavorForgeLogo.png";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="pb-4">
      <div className="flex justify-between items-center">
        <img src={logo} alt="" className="w-16 h-14" />

        <div className="flex gap-10 font-medium text-lg items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 bg-[#E4572E] text-white rounded"
                : "px-4 py-2 text-gray-700 hover:text-[#E4572E]"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/how-it-works"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 bg-[#E4572E] text-white rounded"
                : "px-4 py-2 text-gray-700 hover:text-[#E4572E]"
            }
          >
            How it Works
          </NavLink>

          <NavLink
            to="/faqs"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 bg-[#E4572E] text-white rounded"
                : "px-4 py-2 text-gray-700 hover:text-[#E4572E]"
            }
          >
            FAQs
          </NavLink>
        </div>

        <div className="flex gap-3 font-medium text-base items-center">
          <Link to="/login">
            <button className="w-24 h-10 border border-[#E4572E]/40 bg-[#FFF8EA] rounded-lg">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="w-24 h-10 bg-[#E4572E] text-white rounded-lg">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
