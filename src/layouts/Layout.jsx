import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../pages/Shared/Navbar";

export const Layout = () => {
  return (
    <div className="bg-[#FAF3E0]">
      <div className="max-w-7xl mx-auto py-6">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};
