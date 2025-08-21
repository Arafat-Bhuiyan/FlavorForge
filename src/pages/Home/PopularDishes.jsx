import { useState, useEffect, useRef } from "react";

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
    image:
      "/src/assets/images/chickenSoup.png",
  },
  {
    id: 5,
    title: "Crispy Sweet and Sour Chicken",
    image: "/src/assets/images/pasta.png",
  },
];

const PopularDishes = () => {
  const scrollRef = useRef(null);

  const handleMouseDown = (e) => {
    const slider = scrollRef.current;
    slider.isDown = true;
    slider.startX = e.pageX - slider.offsetLeft;
    slider.scrollLeftStart = slider.scrollLeft;
  };

  const handleMouseLeave = () => {
    scrollRef.current.isDown = false;
  };

  const handleMouseUp = () => {
    scrollRef.current.isDown = false;
  };

  const handleMouseMove = (e) => {
    const slider = scrollRef.current;
    if (!slider.isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - slider.startX) * 1.5; // drag sensitivity
    slider.scrollLeft = slider.scrollLeftStart - walk;
  };

  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    // Normally i will fetch API from backend:
    // fetch("https://your-backend.com/api/dishes")
    //   .then(res => res.json())
    //   .then(data => setDishes(data));
    // now demo data loaded
    setDishes(demoData);
  }, []);

  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center mt-14">
      <h1 className="font-semibold text-4xl text-[#2E2E2E]">Popular Dishes</h1>
      <p className="font-medium text-lg text-[#2E2E2E]">
        Tried, loved, and cooked by thousands of foodies worldwide
      </p>

      {/* Card Section - Horizontal Scroll */}
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto mt-6 scrollbar-hide cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="flex gap-5 px-4 snap-x snap-mandatory">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-white p-4 rounded-2xl min-w-[300px] max-w-[372px] flex-shrink-0 snap-start"
            >
              <img
                src={dish.image}
                alt={dish.title}
                className="w-full object-cover rounded-xl"
              />
              <p className="font-semibold text-xl text-[#2E2E2E] pt-3">
                {dish.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularDishes;
