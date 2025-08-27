import { useEffect, useState } from "react";
import CustomDropdown from "../CustomDropdown";
import usersData from "../../../public/user-subscription.json";

export const Subscription = () => {
  const timeOptions = ["All", "Monthly", "Yearly"];
  const [users, setUsers] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    setUsers(usersData); // Load data from JSON

    // Initialize the statusMap with the users' current statuses
    const initialStatus = {};
    usersData.forEach((user) => {
      initialStatus[user.id] = user.status;
    });
    setStatusMap(initialStatus);
  }, [usersData]);

  const handleSelect = (userId, option) => {
    setStatusMap((prevStatus) => ({
      ...prevStatus,
      [userId]: option,
    }));
    // Call the toggleStatus function if necessary
    // toggleStatus(userId, option);
  };

  return (
    <div className="bg-[#FFFCF9]">
      <div className="flex justify-between items-center mb-7">
        <h1 className="font-medium text-xl">User Subscription Management</h1>
        <div className="flex items-center space-x-2 w-40">
          <CustomDropdown options={timeOptions} defaultLabel="Filter" />
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
            {users.map((user) => (
              <tr key={user.id} className="bg-[#E4572E]/5 shadow-sm rounded-lg">
                <td className="px-4 py-3 rounded-l-lg">{user.name}</td>
                <td className="px-4 py-3">{user.subPlan}</td>
                <td className="px-4 py-3">{user.packageAmount}</td>
                <td className="px-4 py-3">{user.renewalDate}</td>
                <td className="px-4 py-3">{user.expiryWarnings}</td>
                <td className="px-4 py-3">
                  <div className="relative w-32">
                    <CustomDropdown
                      options={["Active", "Postpone"]}
                      defaultLabel={statusMap[user.id]}
                      onSelect={(option) => handleSelect(user.id, option)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
