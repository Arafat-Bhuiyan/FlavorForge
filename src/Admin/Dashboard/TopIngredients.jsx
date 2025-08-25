const ingredients = ["Chicken", "Vegetable", "Fish", "Rice", "Egg", "Tomato"];

const TopIngredients = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-[#E4572E]/15 h-full">
      <h2 className="font-semibold text-lg mb-3">Top 7 Ingredients Used</h2>
      <ul className="space-y-2">
        {ingredients.map((item, i) => (
          <li
            key={i}
            className="p-2 rounded-lg bg-red-50 text-gray-700 font-medium"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopIngredients;
