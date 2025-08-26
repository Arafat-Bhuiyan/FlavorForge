import { useState } from "react";
import AccountManagement from "./AccountManagement";
import Terms from "./Terms";
import Privacy from "./Privacy";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="min-h-screen bg-[#FFFCF9] p-6">
      {/* Top Tabs */}
      <div className="flex gap-5 mb-6">
        <button
          onClick={() => setActiveTab("account")}
          className={`px-4 py-3 rounded-full border border-[#E4572E] font-medium text-base transition ${
            activeTab === "account"
              ? "bg-[#E4572E] text-white shadow-md"
              : "bg-transparent text-[#2E2E2E]"
          }`}
        >
          Account Management
        </button>
        <button
          onClick={() => setActiveTab("terms")}
          className={`px-4 py-3 rounded-full border border-[#E4572E] font-medium text-base transition ${
            activeTab === "terms"
              ? "bg-[#E4572E] text-white shadow-md"
              : "bg-transparent text-[#2E2E2E]"
          }`}
        >
          Terms & Conditions
        </button>
        <button
          onClick={() => setActiveTab("privacy")}
          className={`px-4 py-3 rounded-full border border-[#E4572E] font-medium text-base transition ${
            activeTab === "privacy"
              ? "bg-[#E4572E] text-white shadow-md"
              : "bg-transparent text-[#2E2E2E]"
          }`}
        >
          Privacy Policy
        </button>
      </div>

      {/* Content Switch */}
      {activeTab === "account" && <AccountManagement />}
      {activeTab === "terms" && <Terms />}
      {activeTab === "privacy" && <Privacy />}
    </div>
  );
}






