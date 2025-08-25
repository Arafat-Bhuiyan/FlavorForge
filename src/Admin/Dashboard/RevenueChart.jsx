import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";

const data = [
  { name: "Jan", value1: 200, value2: 300 },
  { name: "Feb", value1: 120, value2: 180 },
  { name: "Mar", value1: 280, value2: 200 },
  { name: "Apr", value1: 190, value2: 320 },
  { name: "May", value1: 350, value2: 270 },
  { name: "Jun", value1: 400, value2: 290 }, // Profit
  { name: "Jul", value1: 300, value2: 200 },
  { name: "Aug", value1: 280, value2: 310 },
  { name: "Sept", value1: 260, value2: 350 },
  { name: "Oct", value1: 220, value2: 300 }, // Loss
  { name: "Nov", value1: 250, value2: 210 },
  { name: "Dec", value1: 300, value2: 370 },
];

const RevenueChart = () => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-2xl">Monthly Revenue</h2>
        <div className="flex items-center space-x-2">
          <select className="text-sm border border-[#E4572E] rounded px-2 py-1">
            <option>Filter</option>
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" className="text-[#2e2e2e] font-semibold" />
          <YAxis
            ticks={[100, 200, 300, 400]}
            domain={[100, 400]}
            tickFormatter={(value) => `$${value}`}
            className="text-[#2e2e2e] font-semibold"
          />

          <Tooltip formatter={(value) => `$${value}`} />

          {/* Reference Dots */}
          <ReferenceDot x="Jun" y={400} r={5} fill="#2E7CF6" />
          <ReferenceDot x="Oct" y={300} r={5} fill="#E4572E" />

          <Line
            type="monotone"
            dataKey="value1"
            stroke="#2E7CF6"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="value2"
            stroke="#E4572E"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Custom Tailwind Labels */}
      <div className="absolute left-[30%] top-[70px] bg-blue-50 border border-blue-500 text-blue-600 text-xs px-2 py-1 rounded-md shadow-sm">
        $ 38.753,00
      </div>
      <div className="absolute left-[72%] top-[150px] bg-red-50 border border-red-500 text-red-600 text-xs px-2 py-1 rounded-md shadow-sm">
        $ 12.657,00
      </div>
    </div>
  );
};

export default RevenueChart;
