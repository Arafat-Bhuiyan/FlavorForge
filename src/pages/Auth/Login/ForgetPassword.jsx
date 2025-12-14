import { useState } from "react";
import logo from "/public/FlavorForgeLogo.png";
import foodBot from "../../../assets/images/food-bot.png";
import { Verification } from "./Verification";
import publicApiInstance from "../../../utils/publicApiInstance";
import { toast } from "react-toastify";

export const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }
    try {
      const { data, status } = await publicApiInstance.post("/send-otp/", {
        email,
      });
      console.log(data);
      if (status === 200) {
        localStorage.setItem("email",email);
        setError("");
        setShowVerification(!showVerification);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center px-0 sm:px-4 mt-8 sm:mt-14 mb-20 sm:mb-32">
      <div className="w-full max-h-screen flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-32">
        {!showVerification ? (
          <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 order-2 lg:order-1">
            {/* Logo */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16">
                <img src={logo} alt="" />
              </div>
            </div>

            {/* Divider */}
            <div className="text-left my-4">
              <h1 className="text-3xl sm:text-4xl text-[#E4572E] pb-2">
                Forgot password
              </h1>
              <p className="text-base text-[#707070]">
                Enter your email for the verification process, we will send 4
                digits code to your email.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4572E] focus:border-transparent"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                className="w-full bg-[#E4572E] hover:bg-[#f55423] text-white font-medium py-3 px-4 rounded-lg transition-colors mb-6"
              >
                Continue
              </button>
            </form>
          </div>
        ) : (
          <Verification />
        )}

        <div className="w-full sm:w-2/3 lg:w-1/2 order-1 lg:order-2">
          <img src={foodBot} alt="" />
        </div>
      </div>
    </div>
  );
};
