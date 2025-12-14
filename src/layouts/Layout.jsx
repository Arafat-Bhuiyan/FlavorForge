import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../pages/Shared/Navbar";
import { Footer } from "../pages/Shared/Footer";

export const Layout = () => {
  return (
    <div className="bg-[#FAF3E0]">
      <div className="pt-6 px-4 md:px-10 lg:px-20">
        <Navbar />
        <div className="">
          {" "}
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};
