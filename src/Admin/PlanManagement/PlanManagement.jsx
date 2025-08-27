import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";

export default function PlanManagement() {
  const [packages, setPackages] = useState([
    {
      id: "Standard",
      amount: 69.99,
      discount: 20,
      type: "Yearly",
      status: "Active",
    },
    {
      id: "Basic",
      amount: 6.99,
      discount: 0,
      type: "Monthly",
      status: "Postpone",
    },
  ]);

  const editIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="#2e2e2e"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path strokeDasharray={20} strokeDashoffset={20} d="M3 21h18">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.2s"
            values="20;0"
          ></animate>
        </path>
        <path
          strokeDasharray={48}
          strokeDashoffset={48}
          d="M7 17v-4l10 -10l4 4l-10 10h-4"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.2s"
            dur="0.6s"
            values="48;0"
          ></animate>
        </path>
        <path strokeDasharray={8} strokeDashoffset={8} d="M14 6l4 4">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.8s"
            dur="0.2s"
            values="8;0"
          ></animate>
        </path>
      </g>
    </svg>
  );

  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const startEdit = (packageId, field, currentValue) => {
    setEditingField(`${packageId}-${field}`);
    setTempValue(currentValue.toString());
  };

  const saveEdit = (packageId, field) => {
    setPackages(
      packages.map((pkg) =>
        pkg.id === packageId
          ? {
              ...pkg,
              [field]:
                field === "amount"
                  ? parseFloat(tempValue) || 0
                  : parseInt(tempValue) || 0,
            }
          : pkg
      )
    );
    setEditingField(null);
    setTempValue("");
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValue("");
  };

  // State for statusMap (initially empty)
  const [statusMap, setStatusMap] = useState({});

  // Handle dropdown selection
  const handleSelect = (userId, option) => {
    setStatusMap((prevStatus) => ({
      ...prevStatus,
      [userId]: option,
    }));
  };

  // Custom Dropdown Component
  const CustomDropdown = ({ options, defaultLabel, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(defaultLabel);

    const handleOptionClick = (option) => {
      setSelected(option);
      onSelect(option);
      setIsOpen(false);
    };

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium ${
            selected === 'Active'
              ? 'bg-[#4CAF50] text-[#FFF9F8] border-none'
              : 'bg-[#E4572E] text-[#FFF9F8] border-none'
          } transition-colors`}
        >
          {selected}
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className="block w-full px-3 py-2 text-xs text-left hover:bg-gray-50"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="">
        {/* Table Header */}
        <div className="grid grid-cols-5 gap-4 px-6 py-4 text-sm font-medium text-[#636363]">
          <div className="text-left">Package ID</div>
          <div className="text-center">Package Amount</div>
          <div className="text-center">Discount</div>
          <div className="text-center">Type</div>
          <div className="text-center">Status</div>
        </div>

        {/* Table Rows */}
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="grid grid-cols-5 gap-4 px-6 py-4 items-center border-b border-[#DFDFDF]"
          >
            {/* Package ID */}
            <div className="font-semibold text-base text-[#2e2e2e] text-left">
              {pkg.id}
            </div>

            {/* Package Amount */}
            <div className="flex items-center gap-2 justify-center">
              {editingField === `${pkg.id}-amount` ? (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.01"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={() => saveEdit(pkg.id, "amount")}
                    className="p-1 text-green-600 hover:bg-green-50 rounded"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-base text-[#2e2e2e]">
                    ${pkg.amount}
                  </span>
                  <button
                    onClick={() => startEdit(pkg.id, "amount", pkg.amount)}
                    className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                  >
                    {editIcon()}
                  </button>
                </div>
              )}
            </div>

            {/* Discount */}
            <div className="flex items-center gap-2 justify-center">
              {editingField === `${pkg.id}-discount` ? (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <span className="text-sm">%</span>
                  <button
                    onClick={() => saveEdit(pkg.id, "discount")}
                    className="p-1 text-green-600 hover:bg-green-50 rounded"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-base text-[#2e2e2e]">
                    {pkg.discount}%
                  </span>
                  <button
                    onClick={() => startEdit(pkg.id, "discount", pkg.discount)}
                    className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                  >
                    {editIcon()}
                  </button>
                </div>
              )}
            </div>

            {/* Type */}
            <div className="font-medium text-base text-[#E4572E] text-center">
              {pkg.type}
            </div>

            {/* Status */}
            <div className="flex justify-center">
              <CustomDropdown
                options={["Active", "Postpone"]}
                defaultLabel={statusMap[pkg.id] || pkg.status}
                onSelect={(option) => handleSelect(pkg.id, option)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}