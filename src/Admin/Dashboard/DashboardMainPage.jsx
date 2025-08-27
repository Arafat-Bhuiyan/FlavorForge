import profile from "../../assets/images/profile4.png";
import { useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { StartCards } from "./StartCards";
import Users from "../Users/Users";
import AiUsageLogs from "../AiUsageLogs/AiUsageLogs";
import Settings from "../Settings/Settings";
import { Subscription } from "../Subscription/Subscription";
import PlanManagement from "../PlanManagement/PlanManagement";

export default function DashboardMainPage() {
  const [currentComponent, setCurrentComponent] = useState("Dashboard"); // New state to track the active component

  const handleComponentChange = (component) => {
    setCurrentComponent(component); // Change the active component
  };
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar
        currentComponent={currentComponent}
        onMenuClick={handleComponentChange}
      />
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-[#FFFDF8] px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-normal text-gray-900">
              {currentComponent === "Dashboard"
                ? "Dashboard"
                : currentComponent === "Users"
                ? "Users Management"
                : currentComponent === "Subscription"
                ? "Subscription"
                : currentComponent === "AI Usage Logs"
                ? "AI Usage Logs"
                : currentComponent === "Settings"
                ? "Settings"
                : currentComponent === "Plan Management"
                ? "Plan Management"
                : "Dashboard"}
            </h1>
            <img src={profile} alt="profile" className="w-12 h-12" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 bg-[#FFFDF8]">
          {/* Conditionally render the component based on the state */}
          {currentComponent === "Dashboard" && (
            <div className="">
              {/* Status Cards */}
              <StartCards />
            </div>
          )}
          {currentComponent === "Users" && <Users />}
          {currentComponent === "AI Usage Logs" && <AiUsageLogs />}
          {currentComponent === "Settings" && <Settings />}
          {currentComponent === "Subscription" && <Subscription />}
          {currentComponent === "Plan Management" && <PlanManagement />}
        </div>
      </div>
    </div>
  );
}
