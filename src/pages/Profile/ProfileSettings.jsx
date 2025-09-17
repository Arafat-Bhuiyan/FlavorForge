import { useState, useEffect, useContext, useRef } from "react";
import { Edit2 } from "lucide-react";
import profile from "../../assets/images/profile.png";
import sms from "../../assets/images/sms.png";
import camera from "../../assets/images/camera.png";
import authApiInstance from "../../utils/privateApiInstance";
import { toast } from "react-toastify";
import { MyContext } from "../../Provider/Provider";
import { formatDistanceToNow } from "date-fns";

const ProfileSettings = () => {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [genderChoices, setGenderChoices] = useState([]);
  const [languageChoices, setLanguageChoices] = useState([]);
  const [countryChoices, setCountryChoices] = useState([]);
  const [email, setEmail] = useState([]);
  const [emails, setEmails] = useState([]); // ✅ email list রাখার জন্য
  const [newEmail, setNewEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const { user, setUser } = useContext(MyContext);
  console.log("emails:", emails)

  // file input ref
  const fileInputRef = useRef(null);

  // ক্যামেরা আইকন ক্লিক করলে ফাইল ইনপুট ওপেন হবে
  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  // ফাইল আপলোড লজিক
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await authApiInstance.patch("/profile/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        const updatedUser = {
          ...user,
          image_url: res.data.image_url, // ✅ backend থেকে পাওয়া নতুন url
        };

        setUser(updatedUser); // context আপডেট
        localStorage.setItem("user", JSON.stringify(updatedUser)); // localStorage আপডেট
        toast.success("Profile picture updated!");
      }
    } catch (error) {
      console.log("Image upload error:", error);
      toast.error("Failed to upload image");
    }
  };

  // ✅ emails সবসময় আলাদা endpoint থেকে আনো
  const fetchEmails = async () => {
    try {
      const res = await authApiInstance.get("/user/emails/");
      if (res.status === 200) {
        const allEmails =
          res.data?.map((em) => ({
            email: em.email,
            addedAt: em.added_at ? new Date(em.added_at) : null,
          })) || [];
        setEmails(allEmails[0].email);
        console.log("Fetched emails:", allEmails[0].email);
      }
    } catch (error) {
      console.log("Emails fetch error:", error);
    }
  };

  // ✅ useEffect এর ভিতরে সব fetch
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
      }
    };

    const fetchProfileData = async () => {
      try {
        const res = await authApiInstance.get("/profile/");
        if (res.status === 200) {
          const profile = res.data;
          setFullName(profile?.full_name || "Not set yet");
          setGender(profile?.gender || "");
          setLanguage(profile?.language || "");
          setCountry(profile?.country || "");
          setEmail(profile?.email || "");
        }
      } catch (error) {
        console.log("Profile fetch error:", error);
      }
    };

    fetchChoices();
    fetchProfileData();
    fetchEmails();
  }, []);

  // ✅ email add করার function
  const handleAddEmail = async () => {
    if (!newEmail) return toast.error("Please enter a valid email");

    if (
      emails.find((em) => em.email.toLowerCase() === newEmail.toLowerCase())
    ) {
      return toast.error("This email already exists!");
    }

    try {
      const res = await authApiInstance.post("/user/emails/add/", {
        email: newEmail,
      });

      if (res.status === 201) {
        toast.success("Email added successfully!");
        setNewEmail("");
        setShowEmailInput(false);
        // ✅ নতুন email যোগ করার পর fresh list আনো
        await fetchEmails();
      }
    } catch (error) {
      console.log("Add email error:", error);
      toast.error("Failed to add email");
    }
  };

  const updateProfileData = async () => {
    try {
      const res = await authApiInstance.patch("/profile/", {
        full_name: fullName,
        gender: gender,
        language: language,
        country: country,
      });
      if (res.status === 200) {
        toast.success("Profile updated");
      }

      // ✅ Context এবং LocalStorage আপডেট করো
      const updatedUser = {
        ...user,
        full_name: fullName,
        gender: gender,
        language: language,
        country: country,
      };

      setUser(updatedUser); // context আপডেট
      localStorage.setItem("user", JSON.stringify(updatedUser)); // localStorage আপডেট
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-lg w-full p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 relative">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={user?.image_url || profile}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />

          {/* Camera Icon */}
          <img
            src={camera}
            alt="upload"
            className="absolute left-11 top-10 w-8 h-7 cursor-pointer"
            onClick={handleCameraClick}
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
            onChange={(e) => {
              setFullName(e.target.value);
              console.log(fullName);
            }}
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
        <div className="flex items-center gap-3 text-sm">
          {" "}
          <div className="w-12 h-12 bg-[#E4572E]/30 flex items-center justify-center rounded-full">
            {" "}
            <img src={sms} className="w-6 h-6" alt="" />{" "}
          </div>{" "}
          <div>
            {" "}
            <p className="text-sm">{email}</p>{" "}
            <p className="text-[#2E2E2E]/50 text-sm">1 month ago</p>{" "}
          </div>{" "}
        </div>

        {/* Emails List */}
        {emails.map((item, index) => (
          <div key={index} className="flex items-center gap-3 text-sm">
            <div className="w-12 h-12 bg-[#E4572E]/30 flex items-center justify-center rounded-full">
              <img src={sms} className="w-6 h-6" alt="" />
            </div>
            <div>
              <p className="text-sm">{item}</p>
              <p className="text-[#2E2E2E]/50 text-sm">
                {item.addedAt
                  ? formatDistanceToNow(item.addedAt, { addSuffix: true })
                  : "Just now"}
              </p>
            </div>
          </div>
        ))}

        {/* Add Email Input (conditionally visible) */}
        {showEmailInput && (
          <div className="flex items-center gap-3">
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter new email"
              className="flex-1 border border-[#2E2E2E]/20 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E4572E]"
            />
            <button
              onClick={handleAddEmail}
              className="bg-[#E4572E] text-white px-4 py-2 rounded-lg hover:bg-[#f55423] transition-colors"
            >
              Save
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
