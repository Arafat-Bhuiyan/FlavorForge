import { Check } from "lucide-react";

const Subscription = () => {
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

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#E4572E] flex flex-col">
            <div className="mb-6 flex-1">
              <div className="text-lg text-[#E4572E] font-semibold mb-2">
                Monthly Plan
              </div>
              <h3 className="text-3xl text-[#2E2E2E] mb-2">Basic</h3>
              <p className="text-[#2E2E2E] text-lg mb-6">
                Experience the convenience of our services with a handful of
                small projects.
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-[#E4572E]">$9.99</span>
                <span className="text-[#E4572E] text-lg font-bold">/mo</span>
                <div className="text-sm text-gray-500 mt-1">
                  Pause or cancel anytime
                  <br />7 days money-back guarantee
                </div>
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

            <button className="w-full bg-[#E4572E] hover:bg-[#f74f1c] text-white font-semibold py-3 px-6 rounded-full transition-colors mt-auto">
              Get Started
            </button>
          </div>

          {/* Standard Plan */}
          <div className="bg-[#E4572E]/20 rounded-2xl shadow-lg p-8 flex flex-col">
            <div className="mb-6 flex-1">
              <div className="text-lg text-[#E4572E] font-semibold mb-2">
                Yearly Plan{" "}
                <span className="text-[#2E2E2E] text-sm font-normal">
                  {" "}
                  (Best Value — Save 30%) $6.99 / month billed annually ($83.88)
                </span>
              </div>
              <h3 className="text-3xl text-[#2E2E2E] mb-2">Standard</h3>
              <p className="text-[#2E2E2E] text-lg mb-6">
                Experience the convenience of our services with a handful of
                small projects.
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-[#E4572E]">$20.9</span>
                <span className="text-[#E4572E] text-lg font-bold">/mo</span>
                <div className="text-sm text-gray-500 mt-1">
                  Pause or cancel anytime
                  <br />7 days money-back guarantee
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8 text-base">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Everything in Monthly</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">
                  Priority recipe generation
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">
                  Early access to new features
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Cancel anytime</span>
              </div>
            </div>

            <button className="w-full bg-white text-[#E4572E] font-semibold py-3 px-6 rounded-full transition-colors mt-auto">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
