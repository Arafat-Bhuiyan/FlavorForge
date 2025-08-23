import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../pages/Shared/Navbar";
import { Footer } from "../pages/Shared/Footer";

export const Layout = () => {
  return (
    <div className="bg-[#FAF3E0]">
      <div className="max-w-7xl mx-auto pt-6">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};
