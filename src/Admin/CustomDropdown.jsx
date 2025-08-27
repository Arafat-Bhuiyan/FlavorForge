import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function CustomDropdown({ options, defaultLabel, onSelect }) {
  const [selected, setSelected] = useState(defaultLabel || "Select");
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
    if (onSelect) onSelect(option);
  };

  // Make a mapping for setting the background color according to the status.
  const statusColors = {
    Active: "bg-[#4CAF50] text-[#FFF9F8] border-none font-medium",
    Postpone: "bg-[#E4572E] text-[#FFF9F8] border-none font-medium",
    Default: "bg-white text-[#2e2e2e] border-[#E4572E]/40",
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between rounded px-3 py-2 text-sm border border-[#E4572E]/40 focus:ring-1 focus:ring-[#E4572E]/60
          ${statusColors[selected] || statusColors.Default}`}
      >
        {selected}
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {open && (
        <div className="absolute mt-1 w-full bg-white rounded shadow-md z-20">
          {options.map((option, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(option)}
              className="px-3 py-2 text-sm text-[#2e2e2e] border border-[#E4572E]/40 hover:bg-[#E4572E]/10 cursor-pointer"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
