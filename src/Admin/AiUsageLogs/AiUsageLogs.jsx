import { useEffect, useState } from "react";
import CustomDropdown from "../CustomDropdown";
import aiUsageLogsData from "../../../public/ai_usage_logs.json"; // Import JSON data

export default function AiUsageLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs(aiUsageLogsData); // Load data from JSON
  }, []);

  return (
    <div className="pt-5 flex flex-col gap-9">
      <div className="flex gap-4 w-full">
        {/* Ingredient Dropdown */}
        <CustomDropdown
          options={[
            "Chicken",
            "Fish",
            "Rice",
            "Egg",
            "Garlic",
            "Cheese",
            "Spinach",
            "Mushroom",
          ]}
          defaultLabel="Filter by Ingredient"
        />

        {/* User Dropdown */}
        <CustomDropdown
          options={logs.map((log) => `${log.email}`)}
          defaultLabel="Filter by User"
        />
      </div>

      <div className="w-full px-4 bg-white">
        <table className="w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-2 font-medium text-gray-800">Date</th>
              <th className="px-4 py-2 font-medium text-gray-800">
                User Email
              </th>
              <th className="px-6 py-2 font-medium text-gray-800">
                Ingredients
              </th>
              <th className="px-4 py-2 text-center font-medium text-gray-800">
                Recipe Generated
              </th>
              <th className="px-4 py-2 text-center font-medium text-gray-800">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index} className="bg-[#E4572E]/5 shadow-sm rounded-lg">
                <td className="px-4 py-3">{log.date}</td>
                <td className="px-4 py-3">{log.email}</td>
                <td className="px-4 py-3">{log.ingredients.join(", ")}</td>
                <td className="px-4 py-3 text-center">{log.recipeGenerated}</td>
                <td className="px-4 py-3 text-center">
                  {log.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
