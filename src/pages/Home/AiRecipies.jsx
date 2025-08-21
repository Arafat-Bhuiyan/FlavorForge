import React from "react";
import recipe1 from "../../assets/images/recipes/recipe1.png";
import recipe2 from "../../assets/images/recipes/recipe2.png";
import recipe3 from "../../assets/images/recipes/recipe3.png";
import recipe4 from "../../assets/images/recipes/recipe4.png";
import recipe5 from "../../assets/images/recipes/recipe5.png";
import recipe6 from "../../assets/images/recipes/recipe6.png";
import recipe7 from "../../assets/images/recipes/recipe7.png";
import recipe8 from "../../assets/images/recipes/recipe8.png";

export const AiRecipies = () => {
  const recipes = [
    {
      img: recipe1,
      title: "One-Skillet Garlicky Salmon & Broccoli",
      rating: 5,
      votes: 8,
    },
    {
      img: recipe2,
      title: "Chicken and Broccoli Stir-Fry",
      rating: 4,
      votes: 15,
    },
    {
      img: recipe3,
      title: "Salad with Grilled Chicken",
      rating: 3,
      votes: 12,
    },
    {
      img: recipe4,
      title: "Sweet and Sour Chicken with Broccoli",
      rating: 4,
      votes: 7,
    },
    {
      img: recipe5,
      title: "Crispy Chicken Salad",
      rating: 5,
      votes: 20,
    },
    {
      img: recipe6,
      title: "Egg Avocado Toast",
      rating: 3,
      votes: 5,
    },
    {
      img: recipe7,
      title: "Grilled Chicken Caesar Salad",
      rating: 4,
      votes: 18,
    },
    {
      img: recipe8,
      title: "Baked Salmon with Spinach",
      rating: 5,
      votes: 25,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center mt-14">
      <h1 className="font-semibold text-4xl text-[#2E2E2E] mb-7">
        Discover All AI-generated Recipes
      </h1>

      <div className="grid grid-cols-4 gap-5 place-items-center">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="relative w-64 h-64 group rounded-xl overflow-hidden shadow-md transition-all group-hover:shadow-[8px_-8px_20px_rgba(0,0,0,0.3)] group-hover:scale-105"
          >
            {/* Image */}
            <img
              src={recipe.img}
              alt={`recipe-${index + 1}`}
              className="w-full h-full object-cover transition-all group-hover:scale-110"
            />

            {/* Hover content */}
            <div className="absolute inset-0 bg-black bg-opacity-40 text-white flex flex-col p-4 opacity-0 group-hover:opacity-100 transition-all">
              {/* Recipe Title in the center */}
              <p className="text-xl font-semibold text-center flex-grow flex items-center justify-center">
                {recipe.title}
              </p>

              {/* Star Rating at the Bottom */}
              <div className="flex justify-center items-center">
                {[...Array(5)].map((_, starIndex) => (
                  <svg
                    key={starIndex}
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    className={`${
                      starIndex < recipe.rating
                        ? "fill-[#FFC210]"
                        : "fill-[#E5E5E5]"
                    }`}
                  >
                    <path d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                  </svg>
                ))}
                <span className="ml-2">({recipe.votes})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
