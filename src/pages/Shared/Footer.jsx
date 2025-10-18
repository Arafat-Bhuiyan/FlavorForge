import React from "react";
import logo from "/FlavorForgeLogo.png";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="w-full bg-[#E4572E]/80 mt-16">
      <div className="py-6 px-12">
        <div className="flex items-start justify-between">
          <div>
            <img src={logo} className="w-16 h-14" alt="" />
            <p className="max-w-96  font-medium text-base text-[#2e2e2e] mt-3">
              Your smart kitchen partner — recipes made simple, healthy, and
              just for you.
            </p>
          </div>
          <div className="text-[#2e2e2e] flex flex-col gap-3">
            <h1 className="font-medium text-xl">Quick Link</h1>
            <div className="font-medium text-sm flex flex-col gap-1">
              <p>Home</p>
              <p>AI Recipe Master</p>
              <p>How it Works</p>
              <p>FAQ's</p>
            </div>
          </div>
          <div className="text-[#2e2e2e] flex flex-col gap-3">
            <h1 className="font-medium text-xl">Contact</h1>
            <div className="font-medium text-sm flex flex-col gap-1">
              <p>+0478895632</p>
              <p>flavorforge02@gmail.com</p>
            </div>
          </div>
        </div>
        
      </div>
      <div className="py-4 px-12 text-[#2E2E2E] flex justify-between items-center border-t p-3">
          <p className="text-base">
            © 2020 Lift flavorforge. All rights reserved
          </p>
          <div className="flex items-center gap-14 font-medium text-lg">
            <NavLink to="/terms&conditions">Terms</NavLink>
            <NavLink to="/privacy-policy">Privacy</NavLink>
          </div>
        </div>
    </div>
  );
};
