import logo from "/public/FlavorForgeLogo.png";
import success from "../../../assets/images/success.png";
import { useNavigate } from "react-router-dom";

export const Success = () => {
  const navigate = useNavigate();
  const handleSuccess = () => {
    navigate("/login");
  };
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16">
          <img src={logo} alt="" />
        </div>
      </div>
      {/* Success */}
      <div className="flex items-center justify-center my-6">
        <div className="w-40 h-40">
          <img src={success} alt="" />
        </div>
      </div>

      {/* Divider */}
      <div className="text-center my-6">
        <h1 className="text-5xl text-black pb-8">Successfully</h1>
        <p className="text-base text-[#707070]">
          Your password has been reset successfully
        </p>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleSuccess}
        className="w-full bg-[#E4572E] hover:bg-[#f55423] text-white font-medium py-3 px-4 rounded-lg transition-colors mb-6 mt-2"
      >
        Continue
      </button>
    </div>
  );
};
