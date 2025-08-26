import { useEffect, useState } from "react";
import usersData from "../../../public/users.json";
import { Eye, Trash2 } from "lucide-react"; // For icons
import UserDetails from "./UserDetails"; // Import the new UserDetails component

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

  const handleBack = () => {
    setSelectedUser(null);
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
          <UserDetails selectedUser={selectedUser} onBack={handleBack} />
        )}
      </div>
    </div>
  );
}
