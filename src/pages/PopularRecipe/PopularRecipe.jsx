import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import recipePhoto1 from "../../assets/images/recipes/recipe1.png";
import recipePhoto2 from "../../assets/images/recipes/recipe2.png";

const recipeImages = {
  "recipe1.png": recipePhoto1,
  "recipe2.png": recipePhoto2,
};

const PopularRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load from local json (simulate API call)
  useEffect(() => {
    fetch("/recipes.json")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  if (recipes.length === 0) {
    return <div className="text-center p-6">Loading recipes...</div>;
  }

  const recipe = recipes[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % recipes.length);
  };

  const handleBack = () => {
    setCurrentIndex((prev) => (prev === 0 ? recipes.length - 1 : prev - 1));
  };

  return (
    <div className="w-full p-4 md:p-6 flex flex-col lg:flex-row gap-6 my-8">
      {/* Left Image */}
      <div className="w-full lg:w-1/4 flex flex-col gap-5">
        <img
          src={recipeImages[recipe.image]}
          alt={recipe.title}
          className="rounded-xl shadow-lg object-cover w-full"
        />

        {/* Buttons */}
        <div className="flex gap-4 w-full">
          <button
            onClick={handleNext}
            className="flex-1 sm:flex-none sm:w-36 h-10 bg-[#E4572E] text-white text-base font-medium rounded-lg hover:bg-[#e94412]"
          >
            Next
          </button>
          <button
            onClick={handleBack}
            className="flex-1 sm:flex-none sm:w-36 h-10 bg-[#E4572E] text-white text-base font-medium rounded-lg hover:bg-[#e94412]"
          >
            Back
          </button>
        </div>
      </div>

      {/* Right Content */}
      <div className="w-full lg:w-3/4 flex flex-col gap-6">
        {/* Title + Desc */}
        <div className="bg-white py-3 px-4 rounded-xl">
          <h2 className="text-[#2E2E2E] text-2xl md:text-3xl font-bold">
            {recipe.title}
          </h2>
          <p className="text-[#2E2E2E] mt-2 text-base md:text-lg">{recipe.description}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={13}
                className={`${
                  i < recipe.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm font-medium text-[#2E2E2E]">
              ({recipe.reviews})
            </span>
          </div>
        </div>

        {/* Ingredients */}
        <div className="bg-white py-3 px-4 rounded-xl text-[#2E2E2E]">
          <h3 className="font-medium text-lg mb-2">Ingredients</h3>
          <ul className="list-disc list-inside text-xs space-y-1">
            {recipe.ingredients.map((ing, idx) => (
              <li className="font-medium text-base pl-2" key={idx}>
                {ing}
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="bg-white py-3 px-4 rounded-xl text-[#2E2E2E]">
          <h3 className="font-medium text-lg mb-2">Instructions</h3>
          <ol className="list-decimal list-inside space-y-3">
            {recipe.instructions.map((section, idx) => (
              <li key={idx} className="font-semibold text-base pl-2">
                {section.title}
                <ul className="list-disc list-inside text-xs font-normal mt-1 space-y-1">
                  {section.steps.map((step, i) => (
                    <li className="font-medium text-base pl-1" key={i}>
                      {step}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PopularRecipe;
