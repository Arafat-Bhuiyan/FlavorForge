import { useState, useEffect, useRef } from "react";
import recipe4 from "../../assets/images/recipe4.png";
import recipe5 from "../../assets/images/recipe5.png";
import left from "../../assets/images/left.png";
import right from "../../assets/images/right.png";
import { useNavigate } from "react-router-dom";

const demoData = [
  {
    id: 1,
    title: "Healthy Creme Chicken Soup Recipe",
    image: "/src/assets/images/chickenSoup.png",
  },
  {
    id: 2,
    title: "Pasta with Sausage, Basil, and Mustard",
    image: "/src/assets/images/pasta.png",
  },
  {
    id: 3,
    title: "90s-Style Mixed Green Salad with Balsamic-Glazed Chicken",
    image: "/src/assets/images/salad.png",
  },
  {
    id: 4,
    title: "Sweet and Sour Chicken with Broccoli",
    image: recipe4,
  },
  {
    id: 5,
    title: "Crispy Sweet and Sour Chicken",
    image: recipe5,
  },
];

const PopularDishes = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 1000;
  };

  const scrollRight = () => {
    scrollRef.current.scrollLeft += 800;
  };

  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    setDishes(demoData);
  }, []);

  return (
    <div onClick={() => navigate("/popular-recipe")} className="w-full flex flex-col gap-2 items-center justify-center mt-14">
      <h1 className="font-semibold text-4xl text-[#2E2E2E]">Popular Dishes</h1>
      <p className="font-medium text-lg text-[#2E2E2E]">
        Tried, loved, and cooked by thousands of foodies worldwide
      </p>

      <div className="relative w-full mt-6">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 z-10"
        >
          <img src={left} alt="" />
        </button>

        {/* Card Section - Horizontal Scroll */}
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto scrollbar-hide flex gap-5 px-4 snap-x snap-mandatory"
        >
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-white p-4 rounded-2xl w-[410px] flex-shrink-0 snap-start h-[452px]"
            >
              <div className="w-[380px] h-[332px] relative">
                <img
                  src={dish.image}
                  alt={dish.title}
                  className="w-full h-full object-cover rounded-xl absolute inset-0"
                />
              </div>
              <p className="font-semibold text-xl text-[#2E2E2E] pt-3">
                {dish.title}
              </p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 z-10"
        >
          <img src={right} alt="" />
        </button>
      </div>
    </div>
  );
};

export default PopularDishes;
