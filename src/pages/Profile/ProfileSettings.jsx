import { useState, useEffect, useContext } from "react";
import { Edit2 } from "lucide-react";
import { toast } from "react-toastify";
import profilePlaceholder from "../../assets/images/profile.png";
import sms from "../../assets/images/sms.png";
import camera from "../../assets/images/camera.png";
import authApiInstance from "../../utils/privateApiInstance";
import { MyContext } from "../../context/context";

const ProfileSettings = () => {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [genderChoices, setGenderChoices] = useState([]);
  const [languageChoices, setLanguageChoices] = useState([]);
  const [countryChoices, setCountryChoices] = useState([]);
  const [email, setEmail] = useState(""); // User email
  const [emails, setEmails] = useState([]); // List of emails
  const [newEmail, setNewEmail] = useState(""); // New email for adding
  const [showEmailInput, setShowEmailInput] = useState(false); // Toggle email input
  const { profile } = useContext(MyContext); // Get profile from context

  // Fetch the choices from the API when the component mounts
  useEffect(() => {
    const fetchChoices = async () => {
      try {
        const res = await authApiInstance.get("/profile/fields/choices/");
        if (res.status === 200) {
          setGenderChoices(res.data.gender_choices);
          setLanguageChoices(res.data.language_choices);
          setCountryChoices(res.data.country_choices);
        }
      } catch (error) {
        console.error("Error fetching profile choices:", error);
        toast.error("Failed to fetch profile choices.");
      }
    };

    // Update profile state with context data
    const fetchProfileData = () => {
      if (profile) {
        setFullName(profile?.full_name || "Full name not set");
        setGender(profile?.gender || "Not set yet");
        setLanguage(profile?.language || "Not set yet");
        setCountry(profile?.country || "Not set yet");
        setEmail(profile?.email || "Not set yet");
      }
    };

      const fetchEmails = async () => {
    try {
      const res = await authApiInstance.get("/user/emails/");
      console.log("emails", res);
    } catch (error) {
      console.error(error);
    }
  };

    fetchChoices();
    fetchEmails();
    fetchProfileData(); // Initialize profile data from context
  }, [profile]); // Dependency on profile to re-fetch when it updates

  const updateProfileData = async () => {
    try {
      const res = await authApiInstance.patch("/profile/", {
        full_name: fullName,
        gender,
        language,
        country,
      });

      if (res.status === 200) {
        toast.success("Profile updated");

        // Update localStorage
        const storedUser = localStorage.getItem("user_data");
        if (storedUser) {
          try {
            const user = JSON.parse(storedUser);
            user.name = fullName;
            user.gender = gender;
            user.language = language;
            user.country = country;

            localStorage.setItem("user_data", JSON.stringify(user));
          } catch (err) {
            console.error("Failed to update localStorage user_data", err);
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };



  const handleAddEmail = async () => {
    if (!newEmail) return toast.error("Please enter an email");

    try {
      const res = await authApiInstance.post("/user/emails/add/", {
        email: newEmail,
      });
      if (res.status === 201) {
        toast.success("Email added successfully");
        setNewEmail("");
        setShowEmailInput(false);
        setEmails((prevEmails) => [...prevEmails, newEmail]); // Update emails state directly
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add email");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-full p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 relative">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={profile?.image_url || profilePlaceholder} // Use actual profile image or placeholder
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
            <h2 className="text-[#2E2E2E] font-medium text-lg">{fullName}</h2>
            <p className="text-[#2E2E2E]/50 text-sm">{email}</p>
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
            className="w-full border border-[#2E2E2E]/20 placeholder:text-[#2E2E2E]/50 text-[#2E2E2E] rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E4572E]"
          >
            <option value="">What is your gender?</option>
            {genderChoices.map((choice, index) => (
              <option key={index} value={choice[0]}>
                {choice[1]}
              </option>
            ))}
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
            {languageChoices.map((choice, index) => (
              <option key={index} value={choice[0]}>
                {choice[1]}
              </option>
            ))}
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
            {countryChoices.map((choice, index) => (
              <option key={index} value={choice[0]}>
                {choice[1]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Email Section */}
      <div className="space-y-4">
        <h3 className="font-medium text-[#2E2E2E]">My email Address</h3>

        {emails.map((email, index) => (
          <div key={index} className="flex items-center gap-3 text-sm">
            <div className="w-12 h-12 bg-[#E4572E]/30 flex items-center justify-center rounded-full">
              <img src={sms} className="w-6 h-6" alt="" />
            </div>
            <div>
              <p className="text-sm">{email}</p>
              <p className="text-[#2E2E2E]/50 text-sm">Added just now</p>
            </div>
          </div>
        ))}

        {showEmailInput && (
          <div className="flex gap-2">
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter new email"
              className="border border-[#2E2E2E]/20 rounded-lg p-2 w-full"
            />
            <button
              onClick={handleAddEmail}
              className="bg-[#E4572E] text-white px-4 rounded-lg"
            >
              Add
            </button>
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowEmailInput((prev) => !prev)}
            className="bg-[#FFE3D5] text-[#E4572E] text-sm w-52 h-10 rounded-lg"
          >
            +Add Email Address
          </button>
          <button
            onClick={updateProfileData}
            className="bg-[#E4572E] text-white w-28 h-10 rounded-lg hover:bg-[#f55423] transition-colors font-medium text-base"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
