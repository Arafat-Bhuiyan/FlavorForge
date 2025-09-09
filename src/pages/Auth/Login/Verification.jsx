import { useState } from "react";
import logo from "/public/FlavorForgeLogo.png";
import { toast } from "react-toastify";
import { NewPassword } from "./NewPassword";
import publicApiInstance from "../../../utils/publicApiInstance";
import { useNavigate } from "react-router-dom";

export const Verification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isVerified, setIsVerified] = useState(false);
  const [showSetNewPass, setShowSetNewPass] = useState(false);

  const email = localStorage.getItem("email");
  const navigate = useNavigate("");
  // OTP change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return false;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto focus to next
    if (value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  // Handle paste
  const handlePaste = (e, index) => {
    const pastedValue = e.clipboardData.getData("Text");
    const newOtp = [...otp];

    for (let i = 0; i < pastedValue.length; i++) {
      if (index + i < 4) {
        newOtp[index + i] = pastedValue[i];
      }
    }

    setOtp(newOtp);

    if (index + pastedValue.length < otp.length) {
      document
        .getElementById(`otp-input-${index + pastedValue.length}`)
        .focus();
    }
  };

  // OTP verify
  const verifyOtp = async(e) => {
    e.preventDefault();
    console.log(otp);
    const joinOtp = otp.join("");
    try {
      const res = await publicApiInstance.post("/verify-otp/",{
        email,
        otp:joinOtp,
      })
      console.log(res);
      if(res.status === 200){
        toast.success("OTP verified");
        localStorage.setItem("otp",joinOtp);
        setShowSetNewPass(true);

      }
    } catch (error) {
      console.log(error)
    }

  };
  return (
    <div className="w-1/2">
      {!showSetNewPass ? (
        <div className=" bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16">
              <img src={logo} alt="" />
            </div>
          </div>

          {/* Title */}
          <div className="text-left my-4">
            <h1 className="text-4xl text-black pb-2">Verification</h1>
            <p className="text-base text-[#707070]">
              Enter the 4-digit code we sent to your email.
            </p>
          </div>

          {/* OTP Form */}
          <form onSubmit={verifyOtp}>
            {/* OTP Input Boxes */}
            <div className="mb-6 flex justify-between gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  id={`otp-input-${index}`}
                  maxLength="1"
                  onChange={(e) => handleOtpChange(e, index)}
                  onPaste={(e) => handlePaste(e, index)}
                  placeholder="0"
                  className="w-20 h-16 font-semibold text-lg text-center bg-[#FDF8F8] border border-[#E4572E] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#f55423]"
                />
              ))}
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full bg-[#E4572E] hover:bg-[#f55423] text-white font-medium py-3 px-4 rounded-lg transition-colors mb-6"
            >
              Continue
            </button>
          </form>

          {/* Resend Link */}
          <div className="text-center text-sm text-gray-600">
            Didn’t receive a code?{" "}
            <span className="text-[#E4572E] hover:text-[#f55423] font-medium cursor-pointer">
              Resend
            </span>
          </div>
        </div>
      ) : (
        <NewPassword />
      )}
    </div>
  );
};
