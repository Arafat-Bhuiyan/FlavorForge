import { Banner } from "./Banner";
import PopularDishes from "./PopularDishes";
import { VideoInstruction } from "./VideoInstruction";

export const Home = () => {
  return (
    <div>
      <Banner />
      <VideoInstruction />
      <PopularDishes />
    </div>
  );
};
