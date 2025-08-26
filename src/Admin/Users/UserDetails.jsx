import React from "react";
import { ChevronLeft } from "lucide-react";
import profile from "../../assets/images/green-profile.png";

const UserDetails = ({ selectedUser, onBack }) => {
  return (
    <div>
      <ChevronLeft onClick={onBack} size={28} color="#2e2e2e" />

      <div className="mt-8 p-4 border border-[#FAE5DE] rounded-lg bg-[#FFFDFD] text-[#2e2e2e]">
        <div className="flex items-center mb-3 gap-2">
          <img src={profile} alt="" />
          <div>
            <p className="font-medium text-2xl">{selectedUser.name}</p>
            <p className="font-medium text-base">Role: User</p>
          </div>
        </div>
        <p className="font-medium text-lg mb-3">
          Email:{" "}
          <span className="font-normal text-base">{selectedUser.email}</span>
        </p>
        <p className="font-medium text-lg mb-3">
          Subscription:{" "}
          <span
            className={`text-base ${
              selectedUser.sub === "Paid" ? "text-[#4CAF50]" : "text-[#E42E2E]"
            }`}
          >
            {selectedUser.sub}
          </span>
          <span className="font-normal"> (monthly)</span>
        </p>
        <p className="font-medium text-lg mb-3">Aug 17, 2025 - Sep 17, 2025</p>

        <div className="flex flex-col gap-4">
          <p className="font-medium text-xl">AI Recipes</p>
          <div className="flex flex-col gap-3">
            <p className="font-medium text-lg">
              One-Skillet Garlicky Salmon & Broccoli
            </p>
            <ul>
              <li className="font-normal text-base list-disc list-inside">
                Rich in omega-3 fatty acids and antioxidants, this dish supports
                heart health while providing a balanced, nutrient-packed meal in
                under 20 minutes.
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-medium text-lg">
              Garlic Butter Chicken with Broccoli
            </p>
            <ul>
              <li className="font-normal text-base list-disc list-inside">
                Garlic Butter Chicken with Broccoli is a quick and tasty
                stir-fry dish made with tender chicken, fresh broccoli, garlic,
                butter, and a light soy-based sauce. It’s flavorful, easy to
                cook in under 30 minutes, and perfect to serve with rice or
                noodles for a complete meal.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
