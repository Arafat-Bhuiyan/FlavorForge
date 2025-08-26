import { useEffect, useState } from "react";
import usersData from "../../../public/users.json";
import { Eye, Trash2 } from "lucide-react"; // For icons
import profile from "../../assets/images/green-profile.png";
import { ChevronLeft } from "lucide-react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setUsers(usersData); // Load data from JSON
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    if (selectedUser?.id === id) {
      setSelectedUser(null);
    }
  };

  const handleViewDetails = (id) => {
    const user = users.find((u) => u.id === id);
    setSelectedUser(user);
  };

  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        {!selectedUser ? (
          <div className="w-full border border-[#E4572E]/40 rounded-xl px-4 bg-white">
            <table className="w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left">
                  <th className="px-4 py-2 font-medium text-gray-800">Name</th>
                  <th className="pl-14 py-2 font-medium text-gray-800">
                    Email
                  </th>
                  <th className="pr-8 py-2 font-medium text-gray-800">
                    Subscription
                  </th>
                  <th className="px-4 py-2 text-center font-medium text-gray-800">
                    View Profile
                  </th>
                  <th className="px-4 py-2 text-center font-medium text-gray-800">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="bg-[#E4572E]/5 shadow-sm rounded-lg"
                  >
                    <td className="px-4 py-3 rounded-l-lg">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-xs ${
                          user.sub === "Paid" ? "bg-[#4CAF50]" : "bg-[#E42E2E]"
                        }`}
                      >
                        {user.sub}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => handleViewDetails(user.id)}>
                        <Eye className="w-5 h-5 text-gray-700" />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center rounded-r-lg">
                      <button onClick={() => handleDelete(user.id)}>
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <ChevronLeft onClick={() => setSelectedUser(null)} size={28} color="#2e2e2e" />

            <div className="mt-8 p-4 border border-[#FAE5DE] rounded-lg bg-[#FFFDFD] text-[#2e2e2e]">
              <div className="flex items-center mb-3 gap-2">
                <img src={profile} alt="" />
                <div>
                  <p className="font-medium text-2xl">{selectedUser.name}</p>
                  <p className="font-medium text-base">Role: User</p>
                </div>
              </div>
              <p className="font-medium text-lg mb-3">
                Email:{" "}
                <span className="font-normal text-base">
                  {selectedUser.email}
                </span>
              </p>
              <p className="font-medium text-lg mb-3">
                Subscription:{" "}
                <span
                  className={`text-base ${
                    selectedUser.sub === "Paid"
                      ? "text-[#4CAF50]"
                      : "text-[#E42E2E]"
                  }`}
                >
                  {selectedUser.sub}
                </span>
                <span className="font-normal"> (monthly)</span>
              </p>
              <p className="font-medium text-lg mb-3">
                Aug 17, 2025 - Sep 17, 2025
              </p>

              <div className="flex flex-col gap-4">
                <p className="font-medium text-xl">AI Recipes</p>
                <div className="flex flex-col gap-3">
                  <p className="font-medium text-lg">
                    One-Skillet Garlicky Salmon & Broccoli
                  </p>
                  <ul>
                    <li className="font-normal text-base list-disc list-inside">
                      Rich in omega-3 fatty acids and antioxidants, this dish
                      supports heart health while providing a balanced,
                      nutrient-packed meal in under 20 minutes.
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="font-medium text-lg">
                    Garlic Butter Chicken with Broccoli
                  </p>
                  <ul>
                    <li className="font-normal text-base list-disc list-inside">
                      Garlic Butter Chicken with Broccoli is a quick and tasty
                      stir-fry dish made with tender chicken, fresh broccoli,
                      garlic, butter, and a lightsoy-based sauce. It’s
                      flavorful, easy to cook in under 30 minutes, and perfect
                      to serve with rice or noodles for a complete meal.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
