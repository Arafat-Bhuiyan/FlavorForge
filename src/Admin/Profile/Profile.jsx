import { useState, useEffect } from "react";
import { Edit2 } from "lucide-react";
import profile from "../../assets/images/profile4.png";
import sms from "../../assets/images/sms.png";
import camera from "../../assets/images/camera.png";
import authApiInstance from "../../utils/privateApiInstance";
import { toast } from "react-toastify";

const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Profile fetch on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authApiInstance.get("/admin/profile/");
        console.log("res:", res);
        const data = res.data;
        setFullName(data.name || "");
        setEmail(data.email || "");
        setGender(data.gender || "");
        setRole(data.role || "");
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const res = await authApiInstance.patch("/admin/profile/", {
        name: fullName,
        email: email,
        gender: gender,
        role: role,
      });

      console.log("Saved Data:", res.data);

      if (res.data?.success) {
        toast.success(res.data.success); // ✅ dynamic success message
        setIsEditing(false);
      } else {
        toast.error("Failed to update profile."); // ✅ fallback error toast
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Something went wrong while updating profile."); // ✅ error toast
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 relative">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={profile}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          <img
            src={camera}
            alt="profile"
            className="absolute left-11 top-10 w-8 h-7"
          />
          <div>
            {/* Header shows updated state values */}
            <h2 className="text-[#2E2E2E] font-medium text-lg">{fullName}</h2>
            <p className="text-[#2E2E2E]/50 text-sm">{email}</p>
          </div>
        </div>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="bg-[#E4572E] text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" /> Edit
          </button>
        )}
      </div>

      {/* Form */}
      <div className="flex flex-col justify-center gap-4 p-4 rounded-lg border border-[#E4572E]/20 shadow-sm bg-white">
        <div>
          <p className="block text-[#2E2E2E] text-lg font-medium mb-2">
            Edit Admin
          </p>
          <label className="block text-[#2E2E2E] text-base font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your First Name"
            disabled={!isEditing}
            className="w-full border border-[#F2C7BB] placeholder:text-[#2E2E2E]/50 text-[#2E2E2E] rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#E4572E] disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-[#2E2E2E] text-base font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={!isEditing}
            className="w-full border border-[#F2C7BB] placeholder:text-[#2E2E2E]/50 text-[#2E2E2E] rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#E4572E] disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-[#2E2E2E] text-base font-medium mb-2">
            Gender
          </label>
          <select
            value={gender || ""}
            onChange={(e) => setGender(e.target.value)}
            disabled={!isEditing}
            className="w-full border border-[#F2C7BB] placeholder:text-[#2E2E2E]/50 text-[#2E2E2E] rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#E4572E] disabled:bg-gray-100"
          >
            <option value="">What is your gender?</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-[#2E2E2E] text-base font-medium mb-2">
            Role
          </label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Your Role"
            disabled={!isEditing}
            className="w-full border border-[#F2C7BB] placeholder:text-[#2E2E2E]/50 text-[#2E2E2E] rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#E4572E] disabled:bg-gray-100"
          />
        </div>
      </div>

      {isEditing && (
        <button
          onClick={handleSave}
          className="bg-[#E4572E] text-white w-52 h-10 rounded-lg hover:bg-[#f55423] transition-colors font-medium text-base"
        >
          Save
        </button>
      )}

      {/* Email Section */}
      <div className="space-y-4">
        <h3 className="font-medium text-[#2E2E2E]">My email Address</h3>
        <div className="flex items-center gap-3 text-sm">
          <div className="w-12 h-12 bg-[#E4572E]/30 flex items-center justify-center rounded-full">
            <img src={sms} className="w-6 h-6" alt="" />
          </div>
          <div>
            <p className="text-sm">{email}</p>
            <p className="text-[#2E2E2E]/50 text-sm">Last login just now</p>
          </div>
        </div>
        <button className="bg-[#FFE3D5] text-[#E4572E] text-sm w-52 h-10 rounded-lg">
          +Add Email Address
        </button>
      </div>
    </div>
  );
};

export default Profile;
