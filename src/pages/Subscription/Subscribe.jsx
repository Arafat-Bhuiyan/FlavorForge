import { useState } from "react";
import chef from "../../assets/images/chef-cartoon.png";
import ThankYou from "./ThankYou";

export default function Subscribe() {
  const [selectedPlan, setSelectedPlan] = useState("9.99");
  const [showThanksPage, setShowThanksPage] = useState(false);

  const handleSubscription = () => {
    setShowThanksPage(true);
  };

  return (
    <div>
      {!showThanksPage ? (
        <div className="w-full p-6 flex gap-36 items-start">
          {/* Header */}
          <div className="w-8" onClick={() => window.history.back()}>
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
          </div>
          <div className="w-[1024px]">
            <h1 className="text-4xl font-medium text-center mb-2">
              Subscribe Now
            </h1>
            <p className="text-center text-[#2E2E2E] font-medium text-base mb-14">
              Join thousands of home cooks making cooking fun and easy every
              day!
            </p>

            {/* Cartoon Chef */}
            <div className="flex justify-center mb-6">
              <img src={chef} alt="chef" className="w-28 h-36" />
            </div>

            {/* Plan Options */}
            <div
              className={`flex justify-between items-center border rounded-lg px-4 py-3 mb-6 cursor-pointer ${
                selectedPlan === "9.99"
                  ? "border-[#E4572E] bg-[#FBFBFB]"
                  : "border-gray-300"
              }`}
              onClick={() => setSelectedPlan("9.99")}
            >
              <label className="flex items-center gap-2 cursor-pointer">
                {/* Hidden Native Radio */}
                <input
                  type="radio"
                  checked={selectedPlan === "9.99"}
                  onChange={() => setSelectedPlan("9.99")}
                  className="hidden"
                />
                {/* Custom Circle */}
                <span
                  className={`w-5 h-5 flex items-center justify-center rounded-full border ${
                    selectedPlan === "9.99"
                      ? "border-[#4CAF50] ring-2 ring-[#4CAF50] bg-[#FBFBFB]"
                      : "border-gray-400 bg-white"
                  }`}
                >
                  {selectedPlan === "9.99" && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FBFBFB]"></span>
                  )}
                </span>
                <span className="font-medium text-xl">Bill Monthly</span>
              </label>

              <span className="font-semibold text-lg">$9.99/month</span>
            </div>

            <div
              className={`flex justify-between items-center border rounded-lg px-4 py-3 mb-6 cursor-pointer ${
                selectedPlan === "20.9"
                  ? "border-[#E4572E] bg-[#FBFBFB]"
                  : "border-gray-300"
              }`}
              onClick={() => setSelectedPlan("20.9")}
            >
              <label className="flex items-center gap-2 cursor-pointer">
                {/* Hidden Native Radio */}
                <input
                  type="radio"
                  checked={selectedPlan === "20.9"}
                  onChange={() => setSelectedPlan("20.9")}
                  className="hidden"
                />
                {/* Custom Circle */}
                <span
                  className={`w-5 h-5 flex items-center justify-center rounded-full border ${
                    selectedPlan === "20.9"
                      ? "border-[#4CAF50] ring-2 ring-[#4CAF50] bg-[#FBFBFB]"
                      : "border-gray-400 bg-white"
                  }`}
                >
                  {selectedPlan === "20.9" && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FBFBFB]"></span>
                  )}
                </span>
                <span className="font-medium text-xl">Bill Monthly</span>
              </label>

              <span className="font-semibold text-lg">$20.9/month</span>
            </div>

            <div className="flex flex-col gap-3 mt-20">
              {/* Terms */}
              <p className="text-center text-lg text-[#2e2e2e] mb-6">
                By clicking on subscribe now you agree to our terms & condition.
                Cancel anytime
              </p>

              {/* Subscribe Button */}
              <button
                onClick={handleSubscription}
                className="w-[732px] h-14 mx-auto bg-[#ef4c23] text-white rounded-lg font-medium text-xl hover:bg-[#d6401b]"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <ThankYou />
      )}
    </div>
  );
}
