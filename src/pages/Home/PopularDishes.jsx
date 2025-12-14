import { useState, useEffect, useRef } from "react";
import left from "../../assets/images/left.png";
import right from "../../assets/images/right.png";
import { useNavigate } from "react-router-dom";

const demoData = [
  {
    id: 1,
    title: "Healthy Creme Chicken Soup Recipe",
    image: "https://i.ibb.co.com/Cs6mL0t4/chicken-Soup.png",
  },
  {
    id: 2,
    title: "Pasta with Sausage, Basil, and Mustard",
    image: "https://i.ibb.co.com/SXPrY9Pd/pasta.png",
  },
  {
    id: 3,
    title: "90s-Style Mixed Green Salad with Balsamic-Glazed Chicken",
    image: "https://i.ibb.co.com/ymcKnpKg/salad.png",
  },
  {
    id: 4,
    title: "Sweet and Sour Chicken with Broccoli",
    image: "https://i.ibb.co.com/67RJ1LXj/recipe4.png",
  },
  {
    id: 5,
    title: "Crispy Sweet and Sour Chicken",
    image: "https://i.ibb.co.com/NdxJVZ5R/recipe5.png",
  },
];

const PopularDishes = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -scrollRef.current.clientWidth, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth, behavior: 'smooth' });
  };

  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    setDishes(demoData);
  }, []);

  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center mt-16 lg:mt-14 px-4">
      <h1 className="font-semibold text-3xl md:text-4xl text-[#2E2E2E] text-center">
        Popular Dishes
      </h1>
      <p className="font-medium text-base md:text-lg text-[#2E2E2E] text-center">
        Tried, loved, and cooked by thousands of foodies worldwide
      </p>

      <div className="relative w-full mt-6">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-[-15px] sm:left-[-30px] top-1/2 transform -translate-y-1/2 z-10 hidden md:block"
        >
          <img src={left} alt="Previous" />
        </button>

        {/* Card Section - Horizontal Scroll */}
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto scrollbar-hide flex gap-5 px-0 sm:px-4 snap-x snap-mandatory"
        >
          {dishes.map((dish) => (
            <div
              onClick={() => navigate("/popular-recipe")}
              key={dish.id}
              className="bg-white p-4 rounded-2xl w-[300px] sm:w-[410px] flex-shrink-0 snap-start h-auto sm:h-[452px] cursor-pointer"
            >
              <div className="w-full h-[250px] sm:h-[332px] relative">
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
          className="absolute right-[-15px] sm:right-[-20px] top-1/2 transform -translate-y-1/2 z-10 hidden md:block"
        >
          <img src={right} alt="Next" />
        </button>
      </div>
    </div>
  );
};

export default PopularDishes;
