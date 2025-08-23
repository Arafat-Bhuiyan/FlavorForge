import { useState } from "react";
import { Edit2, Mail } from "lucide-react";
import profile from "../../assets/images/profile.png";
import sms from "../../assets/images/sms.png";

const ProfileSettings = () => {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [country, setCountry] = useState("");

  return (
    <div className="bg-white rounded-lg shadow-lg w-full p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={profile}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-[#2E2E2E] font-medium text-lg">Alex Rawls</h2>
            <p className="text-[#2E2E2E]/50 text-sm">alexrawls@gmail.com</p>
          </div>
        </div>
        <button className="bg-[#E4572E] text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Edit2 className="w-4 h-4" /> Edit
        </button>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[#2E2E2E] text-base mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your First Name"
            className="w-full border border-[#2E2E2E]/20 placeholder:text-[#2E2E2E]/50 text-[#2E2E2E] rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E4572E]"
          />
        </div>
        <div>
          <label className="block text-[#2E2E2E] text-base mb-2">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border border-[#2E2E2E]/20 placeholder:text-[#2E2E2E]/50 text-[#2E2E2E]  rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E4572E]"
          >
            <option value="">What is your gender?</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-[#2E2E2E] text-base mb-2">
            Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border border-[#2E2E2E]/20 placeholder:text-[#2E2E2E]/50 text-[#2E2E2E] rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E4572E]"
          >
            <option value="">Select your language</option>
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
          </select>
        </div>
        <div>
          <label className="block text-[#2E2E2E] text-base mb-2">Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border border-[#2E2E2E]/20 placeholder:text-[#2E2E2E]/50 text-[#2E2E2E] rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E4572E]"
          >
            <option value="">Select your country</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
            <option value="canada">Canada</option>
          </select>
        </div>
      </div>

      {/* Email Section */}
      <div className="space-y-4">
        <h3 className="font-medium  text-[#2E2E2E]">My email Address</h3>
        <div className="flex items-center gap-3 text-sm">
          <div className="w-12 h-12 bg-[#E4572E]/30 flex items-center justify-center rounded-full">
            <img src={sms} className="w-6 h-6" alt="" />
          </div>
          <div>
            <p className="text-sm">alexrawls@gmail.com</p>
            <p className="text-[#2E2E2E]/50 text-sm">1 month ago</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button className="bg-[#FFE3D5] text-[#E4572E] text-sm w-52 h-10 rounded-lg">
            +Add Email Address
          </button>
          <button className="bg-[#E4572E] text-white w-28 h-10 rounded-lg hover:bg-[#f55423] transition-colors font-medium text-base">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
