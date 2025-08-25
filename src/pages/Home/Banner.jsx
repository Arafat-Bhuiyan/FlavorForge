import { useNavigate } from "react-router-dom";
import bannerImg from "../../assets/images/banner-img.png";
import { MoveRight } from "lucide-react";

export const Banner = () => {
  const navigate = useNavigate();

  const goToChatbot = () => {
    navigate("/chatbot");
  };

  return (
    <div className="w-full flex items-center">
      <div className="w-2/3">
        <div className="flex flex-col gap-6 max-w-screen-md">
          <h1 className="font-bold text-5xl text-[#731B00] leading-snug">
            FlavorForge uses smart AI to
            <span className="block">create personalized recipes</span>
            <span className="block">from your pantry, helping</span>
            <span className="block">you save time in seconds</span>
          </h1>

          <p className="font-medium text-base text-[#2E2E2E]">
            Turn the ingredients you have into delicious meals you’ll love. Our
            AI-powered chef instantly <br /> creates recipes based on your
            taste, dietary needs, and cooking time. Save time, reduce <br />{" "}
            waste, and make every meal a masterpiece — all from the comfort of
            your kitchen
          </p>

          <button onClick={goToChatbot} className="w-72 h-14 bg-[#E4572E] text-white rounded-lg flex gap-2 items-center justify-center">
            Get Started for Free{" "}
            <span className="mt-1">
              <MoveRight color="#ffffff" />
            </span>
          </button>
        </div>
      </div>
      <div className="w-1/3">
        <img src={bannerImg} alt="" />
      </div>
    </div>
  );
};
