import { useState } from "react";
import { useNavigate } from "react-router-dom";
import vector from "../../assets/images/Vector.png";
import { Eye, EyeOff } from "lucide-react";
import authApiInstance from "../../utils/privateApiInstance";
import { toast } from "react-toastify";

export const Settings = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const goToTerms = () => navigate("/terms&conditions");
  const goToPolicy = () => navigate("/privacy-policy");
  const handleSubscription = () => navigate("/subscription");

  const UpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await authApiInstance.put("/update-password/", {
        old_password: currentPassword,
        new_password: newPassword,
      });

      if (res.status === 200) {
        toast.success("Password Updated");
        setCurrentPassword("");
        setNewPassword("");

      }
    } catch (error) {
      toast.error("Password Update Failed. Try again.");
      console.log(error);
    }
  };

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

        {openSection === "password" && (
          <div className="p-4 bg-white border border-[#E4572E]/20 mb-4">
            <h1 className="font-medium text-base">Change Your Password</h1>
            <form
              onSubmit={UpdatePassword}
              className="max-w-2xl mx-auto mt-4 text-[#2E2E2E]"
            >
              {/* Current Password */}
              <label className="block mb-2 font-medium text-sm">
                Current Password
              </label>
              <div className="relative mb-4">
                <input
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full border border-[#F2C7BB] p-2 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showCurrent ? (
                    <EyeOff color="#2E2E2E" />
                  ) : (
                    <Eye color="#2E2E2E" />
                  )}
                </button>
              </div>

              {/* New Password */}
              <label className="block mb-2 font-medium text-sm">
                New Password
              </label>
              <div className="relative mb-5">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-[#F2C7BB] p-2 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showNew ? (
                    <EyeOff color="#2E2E2E" />
                  ) : (
                    <Eye color="#2E2E2E" />
                  )}
                </button>
              </div>

              {/* Submit */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-[614px] bg-[#E4572E] text-white py-2 rounded-lg font-medium text-lg"
                >
                  Confirm New Password
                </button>
              </div>
            </form>
          </div>
        )}

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
        {openSection === "delete" && (
          <div className="p-4 bg-white border rounded-lg">
            <div className="max-w-2xl mx-auto flex flex-col gap-5">
              {/* Delete Account Form */}
              <div className="flex items-center justify-center gap-5">
                <img src={vector} className="w-7 h-7" alt="" />
                <h3 className="text-[#2E2E2E] font-medium text-2xl mb-2">
                  Delete Account Page UI
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#ED0606"
                    d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
                  />
                </svg>
              </div>
              <div className="p-4 w-[571px] mx-auto bg-[#FFEAEA] flex items-center">
                <p className="text-sm text-[#2e2e2e] mb-3">
                  Once deleted, your account cannot be recovered. All your
                  recipes, preferences, and subscription data will be
                  permanently removed.
                </p>
              </div>

              <div>
                <p className="font-medium text-base text-black mb-4">
                  Type <span className="text-[#E4572E]">DELETE</span> to confirm
                </p>

                <div className="flex flex-col gap-3">
                  <div className="text-base bg-[#FDF8F8] border border-[#E4572E]/25 p-2 rounded-lg">
                    <p>Yes</p>
                  </div>
                  <div className="text-basebg-[#FDF8F8] border border-[#E4572E]/25 p-2 rounded-lg">
                    <p>No</p>
                  </div>
                  <label className="flex items-center mb-3">
                    <input type="checkbox" className="mr-2" /> I understand the
                    consequences
                  </label>
                </div>
              </div>

              <div>
                <button className="bg-[#E42E2E] text-white font-medium text-base w-full py-2 rounded-lg mb-3">
                  Delete My Account
                </button>
                <button className="border-[#CCCCCC]/23 bg-[#FFFDFD] w-full py-2 border rounded-lg font-medium text-base">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
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
