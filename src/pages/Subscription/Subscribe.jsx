import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import chef from "../../assets/images/chef-cartoon.png";
import ThankYou from "./ThankYou";
import authApiInstance from "../../utils/privateApiInstance";
import publicApiInstance from "../../utils/publicApiInstance";

export default function Subscribe() {
  const [subscriptions, setSubscriptions] = useState([]); // State to store subscription data
  const [selectedPlan, setSelectedPlan] = useState(null); // Selected plan

  // Fetch subscription data from the API
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await publicApiInstance.get("/subscription/list/");
        if (res.status === 200) {
          setSubscriptions(res.data.data); // Set the fetched data
          if (res.data.data.length > 0) {
            setSelectedPlan(res.data.data[0].id); // Set default plan (first in the list)
          }
        }
      } catch (error) {
        console.error("Error fetching subscription data:", error);
      }
    };

    fetchSubscriptions();
  }, []); // Empty dependency array ensures it runs only once on mount

  // Handle subscription button click
  const handleSubscription = async () => {
    try {
      const selectedPackage = subscriptions.find(
        (pkg) => pkg.id === selectedPlan
      );
      if (selectedPackage) {
        const res = await authApiInstance.post("/make/subscribtion/payment/", {
          package_id: selectedPackage.id,
          amount: selectedPackage.total_price,
        });
        if (res.status === 200 && res.data.checkout_url) {
          window.location.href = res.data.checkout_url; // Redirect to the checkout URL
        }
      }
    } catch (error) {
      console.error("Error processing subscription:", error);
    }
  };

  return (
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
        <h1 className="text-4xl font-medium text-center mb-2">Subscribe Now</h1>
        <p className="text-center text-[#2E2E2E] font-medium text-base mb-14">
          Join thousands of home cooks making cooking fun and easy every day!
        </p>

        {/* Cartoon Chef */}
        <div className="flex justify-center mb-6">
          <img src={chef} alt="chef" className="w-28 h-36" />
        </div>

        {/* Plan Options */}
        {subscriptions.map((subscription) => (
          <div
            key={subscription.id}
            className={`flex justify-between items-center border rounded-lg px-4 py-3 mb-6 cursor-pointer ${
              selectedPlan === subscription.id
                ? "border-[#E4572E] bg-[#FBFBFB]"
                : "border-gray-300"
            }`}
            onClick={() => setSelectedPlan(subscription.id)}
          >
            <label className="flex items-center gap-2 cursor-pointer">
              {/* Hidden Native Radio */}
              <input
                type="radio"
                checked={selectedPlan === subscription.id}
                onChange={() => setSelectedPlan(subscription.id)}
                className="hidden"
              />
              {/* Custom Circle */}
              <span
                className={`w-5 h-5 flex items-center justify-center rounded-full border ${
                  selectedPlan === subscription.id
                    ? "border-[#4CAF50] ring-2 ring-[#4CAF50] bg-[#FBFBFB]"
                    : "border-gray-400 bg-white"
                }`}
              >
                {selectedPlan === subscription.id && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FBFBFB]"></span>
                )}
              </span>
              <span className="font-medium text-xl">
                {subscription.timing === "monthly"
                  ? "Bill Monthly"
                  : "Bill Yearly"}
              </span>
            </label>

            <span className="font-semibold text-lg">
              <span className="line-through text-red-500">
                ${subscription.initial_price}
              </span>
              <span className="font-normal">
                {" "}
                ${subscription.total_price}/{subscription.timing}
              </span>
            </span>
          </div>
        ))}

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
  );
}
