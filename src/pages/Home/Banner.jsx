import { useNavigate } from "react-router-dom";
import bannerImg from "../../assets/images/banner-img.png";
import { MoveRight } from "lucide-react";

export const Banner = () => {
  const navigate = useNavigate();

  const goToChatbot = () => {
    navigate("/chatbot");
  };

  return (
    <div className="w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
      <div className="w-full lg:w-2/3 order-2 lg:order-1">
        <div className="flex flex-col gap-6 max-w-screen-md text-center lg:text-left">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-[#731B00] leading-snug">
            FlavorForge uses smart AI to create personalized recipes from your
            pantry, helping you save time in seconds
          </h1>

          <p className="font-medium text-base text-[#2E2E2E]">
            Turn the ingredients you have into delicious meals you’ll love. Our
            AI-powered chef instantly creates recipes based on your taste,
            dietary needs, and cooking time. Save time, reduce waste, and make
            every meal a masterpiece — all from the comfort of your kitchen.
          </p>

          <button
            onClick={goToChatbot}
            className="w-full sm:w-72 h-14 bg-[#E4572E] text-white rounded-lg flex gap-2 items-center justify-center mx-auto lg:mx-0"
          >
            Get Started for Free{" "}
            <span className="mt-1">
              <MoveRight color="#ffffff" />
            </span>
          </button>
        </div>
      </div>
      <div className="w-full sm:w-2/3 lg:w-1/3 order-1 lg:order-2">
        <img src={bannerImg} alt="" />
      </div>
    </div>
  );
};
