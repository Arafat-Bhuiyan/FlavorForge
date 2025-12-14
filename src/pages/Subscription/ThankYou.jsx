import { useNavigate } from "react-router-dom";
import chef from "../../assets/images/chef-cartoon.png";

export default function ThankYou() {
  const navigate = useNavigate();

  const handleCooking = () => {
    navigate("/");
  };

  return (
    <div className="w-full p-4 sm:p-6 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start my-8">
      {/* Back Button */}
      <button
        className="w-8 h-8 flex-shrink-0"
        onClick={() => window.history.back()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={28}
          height={28}
          viewBox="0 0 1024 1024"
        >
          <path
            fill="#2e2e2e"
            d="M609.408 149.376L277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0a30.59 30.59 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.59 30.59 0 0 0 0-42.688a29.12 29.12 0 0 0-41.728 0"
          ></path>
        </svg>
      </button>

      {/* Header */}
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center justify-center text-center sm:text-left">
          <div className="order-2 sm:order-1">
            <h1 className="text-3xl md:text-4xl font-medium mb-4">
              Thank You for Subscribing!
            </h1>
            <p className="text-[#2E2E2E] font-medium text-base mb-8 sm:mb-14">
              Your Monthly Plan is now active
            </p>
          </div>

          {/* Chef Image */}
          <div className="flex justify-center mb-6 order-1 sm:order-2">
            <img src={chef} alt="chef" className="w-28 h-36" />
          </div>
        </div>

        {/* Card */}
        <div className="border rounded-lg bg-white shadow-sm flex flex-col items-center p-6 sm:p-10 lg:p-16 mb-6">
          <div className="flex flex-col items-center sm:items-start gap-4 w-full">
            <p className="font-medium text-lg mb-2 text-center sm:text-left">
              You now have full access to:
            </p>
            <ul className="text-base sm:text-sm text-[#2e2e2e] list-disc list-inside mb-4 flex flex-col gap-3 self-center sm:self-start">
              <li>Unlimited recipe generations</li>
              <li>Personalized meal suggestions</li>
              <li>Save & manage your favorite recipes</li>
            </ul>
          </div>

          <p className="text-center text-base sm:text-lg text-[#2e2e2e] my-6">
            You can update or cancel your subscription anytime from the Account
            Settings.
          </p>
          <button
            onClick={handleCooking}
            className="w-full max-w-2xl h-14 mx-auto bg-[#ef4c23] text-white rounded-lg font-medium text-xl hover:bg-[#d6401b]"
          >
            Start Cooking
          </button>
        </div>
      </div>
    </div>
  );
}
