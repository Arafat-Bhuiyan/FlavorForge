import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import authApiInstance from "../../utils/privateApiInstance";

export const ChangePassword = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

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
            {showCurrent ? <EyeOff color="#2E2E2E" /> : <Eye color="#2E2E2E" />}
          </button>
        </div>

        {/* New Password */}
        <label className="block mb-2 font-medium text-sm">New Password</label>
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
            {showNew ? <EyeOff color="#2E2E2E" /> : <Eye color="#2E2E2E" />}
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
  );
};
