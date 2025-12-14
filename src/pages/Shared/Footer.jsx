import React from "react";
import logo from "/FlavorForgeLogo.png";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="w-full bg-[#E4572E]/80 mt-16">
      <div className="py-6 px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-4">
          <div className="w-full md:w-auto">
            <img src={logo} className="w-16 h-14" alt="" />
            <p className="max-w-full md:max-w-96 font-medium text-base text-[#2e2e2e] mt-3">
              Your smart kitchen partner — recipes made simple, healthy, and
              just for you.
            </p>
          </div>
          <div className="text-[#2e2e2e] flex flex-col gap-3">
            <h1 className="font-medium text-xl">Quick Link</h1>
            <div className="font-medium text-sm flex flex-col gap-1">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/ai-recipe-master">AI Recipe Master</NavLink>
              <a href="/#how-it-works">How it Works</a>
              <a href="/#faqs">FAQ's</a>
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
      <div className="py-4 px-6 md:px-12 text-[#2E2E2E] flex flex-col-reverse sm:flex-row justify-between items-center border-t p-3 gap-4 sm:gap-0">
          <p className="text-sm sm:text-base text-center sm:text-left">
            © 2020 Lift flavorforge. All rights reserved
          </p>
          <div className="flex items-center gap-8 sm:gap-14 font-medium text-base sm:text-lg">
            <NavLink to="/terms&conditions">Terms</NavLink>
            <NavLink to="/privacy-policy">Privacy</NavLink>
          </div>
        </div>
    </div>
  );
};
