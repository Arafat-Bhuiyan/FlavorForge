import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import authApiInstance from "../../utils/privateApiInstance";
import { de } from "date-fns/locale";
import publicApiInstance from "../../utils/publicApiInstance";

const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState([]); // State to store subscription data
  const navigate = useNavigate();

  // Fetch subscription data from the API
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await publicApiInstance.get("/subscription/list/");
        if (res.status === 200) {
          setSubscriptions(res.data.data); // Set the fetched data
        }
      } catch (error) {
        console.error("Error fetching subscription data:", error);
      }
    };

    fetchSubscriptions();
  }, []); // Empty dependency array ensures it runs only once on mount

  const handleSubscription = () => {
    navigate("/subscription");
  };

  return (
    <div className="min-h-screen px-4">
      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto mt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-medium text-[#2E2E2E] mb-4">
            Unlock the Full Kitchen Experience
          </h1>
          <p className="text-lg text-[#2E2E2E] text-center">
            Go premium to access unlimited AI recipes, and unlock unlimited
            access to ingredients lists <br /> for every recipe, plus instant
            chatbot-powered cooking instructions— all designed to make <br />{" "}
            every meal easier, healthier, and more delicious
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Dynamic Subscription Plans */}
          {subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className={`${
                subscription.package_id === "free" ? "bg-white" : "bg-[#F8CDA3]"
              } rounded-2xl shadow-lg p-8 flex flex-col border ${
                subscription.package_id === "free" ? "border-[#E4572E]" : ""
              }`}
            >
              <div className="flex-1">
                <div className="text-lg text-[#E4572E] font-semibold">
                  {subscription.timing === "monthly"
                    ? "Monthly Plan"
                    : "Yearly Plan"}
                  {subscription.timing === "yearly" && (
                    <span className="text-[#2E2E2E] text-base font-medium">
                      (Best Value — Save 20%)
                    </span>
                  )}
                </div>
                <h3 className="text-3xl text-[#2E2E2E] my-5">
                  {subscription.package_id.charAt(0).toUpperCase() +
                    subscription.package_id.slice(1)}
                </h3>
                <p className="w-1/2 text-[#2E2E2E] text-lg">
                  Experience the convenience of our services with a handful of
                  small projects.
                </p>
              </div>

              <div className="my-10">
                <span className="text-4xl font-bold text-[#E4572E]">
                  {" "}
                  <span className="text-2xl font-normal">$</span>
                  {subscription.initial_price}
                </span>
                <span className="text-[#E4572E] text-xl font-bold">
                  {subscription.timing === "monthly" ? "/monthly" : "/yearly"}
                </span>
                <div className="text-base text-[#2E2E2E] mt-1">
                  List all features under here
                </div>
              </div>

              <div className="space-y-4 mb-8 text-base">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">
                    Unlimited AI-generated recipes
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">
                    Save and organize favorite dishes
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">
                    Nutritional info & calorie tracking
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Cancel anytime</span>
                </div>
              </div>

              <button
                onClick={handleSubscription}
                className="w-full bg-[#E4572E] hover:bg-[#f74f1c] text-white font-semibold py-3 px-6 rounded-full transition-colors mt-auto"
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
