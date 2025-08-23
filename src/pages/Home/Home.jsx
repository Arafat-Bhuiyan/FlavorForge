import { AiRecipies } from "./AiRecipies";
import { Banner } from "./Banner";
import FAQs from "./FAQs";
import PopularDishes from "./PopularDishes";
import Subscription from "./Subsciption";
import { Testimonial } from "./Testimonial";
import { VideoInstruction } from "./VideoInstruction";

export const Home = () => {
  return (
    <div>
      <Banner />
      <VideoInstruction />
      <PopularDishes />
      <AiRecipies />
      <Subscription />
      <Testimonial />
      <FAQs />
    </div>
  );
};
