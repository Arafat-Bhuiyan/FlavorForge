import React from "react";

export const Settings = () => {
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
          <button className="p-3 bg-[#E4572E] rounded-lg text-white text-base font-medium mt-6">
            Manage Subscription
          </button>
        </div>
      </div>
      <div className="bg-[#FDF7F5] p-5 rounded-xl my-5 text-[#2E2E2E]">
        <h2 className="text-xl font-medium mb-3">Account Management :</h2>
        <div className="flex items-center justify-between text-lg mb-2 bg-[#FFFDFD] border border-[#E4572E]/35 p-2 rounded-lg">
          <p>Change Password</p>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="#2e2e2e"
                d="m13.172 12l-4.95-4.95l1.414-1.413L16 12l-6.364 6.364l-1.414-1.415z"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center justify-between text-[#E4572E] text-lg mb-2 bg-[#FFFDFD] border border-[#E4572E]/35 p-2 rounded-lg">
          <p>Delete Account</p>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="#2e2e2e"
                d="m13.172 12l-4.95-4.95l1.414-1.413L16 12l-6.364 6.364l-1.414-1.415z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#FDF7F5] p-5 font-medium rounded-xl my-5 text-[#2E2E2E]">
        <h2 className="text-xl mb-3">Legal :</h2>
        <div className="text-lg mb-2 bg-[#FFFDFD] border border-[#E4572E]/35 p-2 rounded-lg">
          <p>Terms & Conditions</p>
        </div>
        <div className="text-lg mb-2 bg-[#FFFDFD] border border-[#E4572E]/35 p-2 rounded-lg">
          <p>Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};
