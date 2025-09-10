import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteAccount } from "./DeleteAccount";
import { ChangePassword } from "./ChangePassword";

export const Settings = () => {
  const [openSection, setOpenSection] = useState(null);

  const navigate = useNavigate();

  const goToTerms = () => navigate("/terms&conditions");
  const goToPolicy = () => navigate("/privacy-policy");
  const handleSubscription = () => navigate("/subscription");

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md border border-[#E4572E]/25">
      <h1 className="text-3xl font-medium text-[#2E2E2E] text-start">
        Settings
      </h1>

      <div className="bg-[#FDF7F5] p-5 rounded-xl my-5 text-[#2E2E2E]">
        <h2 className="text-xl font-medium  mb-3">Subscription Details :</h2>
        <div className="flex items-center justify-between text-lg">
          <p>Current Plan</p>
          <p className="text-[#E4572E]">(Monthly)</p>
        </div>
        <div className="flex items-center justify-between text-lg">
          <p>Start Date</p>
          <p>Aug 01 2025</p>
        </div>
        <div className="flex items-center justify-between text-lg">
          <p>Expiry Date</p>
          <p>Sep 01 2025</p>
        </div>
        <div className="flex items-center justify-end">
          <button
            onClick={handleSubscription}
            className="p-3 bg-[#E4572E] rounded-lg text-white text-base font-medium mt-6"
          >
            Manage Subscription
          </button>
        </div>
      </div>

      {/* Change password and Delete Account */}
      <div className="bg-[#FDF7F5] p-5 rounded-xl my-5 text-[#2E2E2E]">
        <h2 className="text-xl font-medium mb-5">Account Management :</h2>

        {/* Change Password */}
        <div
          onClick={() =>
            setOpenSection(openSection === "password" ? null : "password")
          }
          className={`flex items-center justify-between text-lg cursor-pointer 
  bg-[#FFFDFD] border border-[#E4572E]/35 p-2 rounded-lg`}
        >
          <p>Change Password</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            className={`transform transition-transform duration-200 ${
              openSection === "password" ? "rotate-90" : ""
            }`}
          >
            <path
              fill="#2e2e2e"
              d="m13.172 12l-4.95-4.95l1.414-1.413L16 12l-6.364 6.364l-1.414-1.415z"
            />
          </svg>
        </div>

        {openSection === "password" && <ChangePassword />}

        {/* Delete Account */}
        <div
          onClick={() =>
            setOpenSection(openSection === "delete" ? null : "delete")
          }
          className={`flex items-center justify-between text-lg mt-5 mb-2 cursor-pointer 
        bg-[#FFFDFD] border border-[#E4572E]/35 p-2 rounded-lg`}
        >
          <p className="text-[#E4572E]">Delete Account</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            className={`transform transition-transform duration-200 ${
              openSection === "delete" ? "rotate-90" : ""
            }`}
          >
            <path
              fill="#2e2e2e"
              d="m13.172 12l-4.95-4.95l1.414-1.413L16 12l-6.364 6.364l-1.414-1.415z"
            />
          </svg>
        </div>
        {openSection === "delete" && <DeleteAccount />}
      </div>

      {/* Terms & Policy */}
      <div className="bg-[#FDF7F5] p-5 font-medium rounded-xl my-5 text-[#2E2E2E]">
        <h2 className="text-xl mb-5">Legal :</h2>
        <div
          onClick={goToTerms}
          className="text-lg mb-5 bg-[#FFFDFD] border border-[#E4572E]/35 p-2 rounded-lg"
        >
          <p>Terms & Conditions</p>
        </div>
        <div
          onClick={goToPolicy}
          className="text-lg bg-[#FFFDFD] border border-[#E4572E]/35 p-2 rounded-lg"
        >
          <p>Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};
