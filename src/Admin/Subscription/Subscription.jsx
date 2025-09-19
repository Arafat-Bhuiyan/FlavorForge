import { useEffect, useState } from "react";
import CustomDropdown from "../CustomDropdown";
import usersData from "../../../public/user-subscription.json";
import authApiInstance from "../../utils/privateApiInstance";

export const Subscription = () => {
  const timeOptions = ["All", "Monthly", "Yearly"];
  const [users, setUsers] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [filter, setFilter] = useState("All"); // filter state
  const [loading, setLoading] = useState(false);

  // ✅ API call করে users load করা
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await authApiInstance.get("/admin/user/subs/list/");
        if (res.status === 200 && Array.isArray(res.data)) {
          setUsers(res.data);

          // statusMap initialize করা
          const initialStatus = {};
          res.data.forEach((user, index) => {
            initialStatus[index] = user.status; // index কে key হিসেবে ব্যবহার করলাম
          });
          setStatusMap(initialStatus);
        } else {
          console.warn("Unexpected API response, fallback to local data");
          setUsers(usersData);
        }
      } catch (error) {
        console.error("Failed to fetch subscription list:", error);
        // fallback: local data
        setUsers(usersData);
        const initialStatus = {};
        usersData.forEach((user) => {
          initialStatus[user.id] = user.status;
        });
        setStatusMap(initialStatus);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSelect = (userKey, option) => {
    setStatusMap((prevStatus) => ({
      ...prevStatus,
      [userKey]: option,
    }));
  };

  // filter করা হচ্ছে subPlan দিয়ে
  const filteredUsers =
    filter === "All" ? users : users.filter((user) => user.subcription_plan === filter);

  return (
    <div className="bg-[#FFFCF9]">
      <div className="flex justify-between items-center mb-7">
        <h1 className="font-medium text-xl">User Subscription Management</h1>
        <div className="flex items-center space-x-2 w-40">
          <CustomDropdown
            options={timeOptions}
            defaultLabel="Filter"
            onSelect={(option) => setFilter(option)} // dropdown select করলে filter set হবে
          />
        </div>
      </div>

      <div className="w-full border border-[#E4572E]/40 rounded-xl px-4 bg-white">
        <table className="w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-2 font-medium text-gray-800">Name</th>
              <th className="px-4 py-2 font-medium text-gray-800">
                Subscription Plan
              </th>
              <th className="pr-8 py-2 font-medium text-gray-800">
                Package Amount
              </th>
              <th className="px-4 py-2 text-start font-medium text-gray-800">
                Renewal Date
              </th>
              <th className="px-4 py-2 text-start font-medium text-gray-800">
                Expiry warnings
              </th>
              <th className="px-4 py-2 text-start font-medium text-gray-800">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} className="bg-[#E4572E]/5 shadow-sm rounded-lg">
                <td className="px-4 py-3 rounded-l-lg">{user.name || "—"}</td>
                <td className="px-4 py-3">{user.subcription_plan}</td>
                <td className="px-4 py-3">{user.pakage_amount}</td>
                <td className="px-4 py-3">{user.renewal_date || "N/A"}</td>
                <td className="px-4 py-3">{user.expiry_warnings || "N/A"}</td>
                <td className="px-4 py-3">
                  <div className="relative w-32">
                    <CustomDropdown
                      options={["Active", "Postpone"]}
                      defaultLabel={statusMap[[index]]}
                      onSelect={(option) => handleSelect(index, option)}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No users found for "{filter}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
