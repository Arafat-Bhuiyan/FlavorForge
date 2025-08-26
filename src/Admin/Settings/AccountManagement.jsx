import { Eye, EyeOff  } from "lucide-react";
import { useState } from "react";

export default function AccountManagement() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const toggleOldPasswordVisibility = () =>
    setShowOldPassword(!showOldPassword);
  const toggleNewPasswordVisibility = () =>
    setShowNewPassword(!showNewPassword);
  return (
    <div className="space-y-6">
      {/* Table */}
      <div className="shadow-sm px-4 py-2 rounded-lg overflow-hidden bg-[#FDF5F3]">
        <div className="grid grid-cols-5 text-lg font-medium text-[#2E2E2E] bg-[#FFF8F6] px-4 py-3 mb-5">
          <div className="text-start">Name</div>
          <div className="text-center">Email</div>
          <div className="text-center">Role</div>
          <div className="text-center">Last Login</div>
          <div className="text-end">Action</div>
        </div>
        <div className="grid grid-cols-5 items-center text-base font-normal px-4 py-3 border border-[#E4572E]/40 rounded-lg bg-[#FFF9F8]">
          <div className="text-start">Dinal Smith</div>
          <div className="text-[#007AD2] text-center">john@example.com</div>
          <div className="text-center">Admin</div>
          <div className="text-center">Aug 14, 2025 – 10:35 AM</div>
          <div className="text-[#4CAF50] font-semibold text-end">Active</div>
        </div>
      </div>

      {/* Edit Admin Form */}
      <div className="border border-[#E4572E]/20 rounded-lg p-4 bg-white">
        <h2 className="font-medium text-lg text-[#2E2E2E] mb-4">Edit Admin</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#2E2E2E] mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-[#F2C7BB]/30 placeholder:text-[#838383] text-[#2e2e2e] text-sm font-normal rounded-lg p-4 ring-1 ring-[#f7b7a6] focus:outline-none focus:ring-2 focus:ring-[#E4572E] transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2E2E2E] mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-[#F2C7BB]/30 placeholder:text-[#838383] text-[#2e2e2e] text-sm font-normal rounded-lg p-4 ring-1 ring-[#f7b7a6] focus:outline-none focus:ring-2 focus:ring-[#E4572E] transition"
            />
          </div>

          {/* Old Password Input */}
          <div>
            <label className="block text-sm font-medium text-[#2E2E2E] mb-1">
              Old Password
            </label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"} // Show/hide based on state
                placeholder="********"
                className="w-full border border-[#F2C7BB]/30 placeholder:text-[#838383] text-[#2e2e2e] text-sm font-normal rounded-lg p-4 ring-1 ring-[#f7b7a6] focus:outline-none focus:ring-2 focus:ring-[#E4572E] transition"
              />
              <span
                onClick={toggleOldPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showOldPassword ? (
                  <EyeOff  className="w-5 h-5 text-[#2e2e2e]" />
                ) : (
                  <Eye className="w-5 h-5 text-[#2e2e2e]" />
                )}
              </span>
            </div>
          </div>

          {/* New Password Input */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-[#2E2E2E] mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"} // Show/hide based on state
                placeholder="********"
                className="w-full border border-[#F2C7BB]/30 placeholder:text-[#838383] text-[#2e2e2e] text-sm font-normal rounded-lg p-4 ring-1 ring-[#f7b7a6] focus:outline-none focus:ring-2 focus:ring-[#E4572E] transition"
              />
              <span
                onClick={toggleNewPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showNewPassword ? (
                  <EyeOff  className="w-5 h-5 text-[#2e2e2e]" />
                ) : (
                  <Eye className="w-5 h-5 text-[#2e2e2e]" />
                )}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#E4572E] font-medium text-base w-44 h-10 text-center text-white px-6 py-2 rounded-lg shadow hover:bg-[#c64721]"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
