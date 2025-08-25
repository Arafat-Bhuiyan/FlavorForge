const users = [
  { name: "Jane Smith", sub: "Paid", date: "July 24, 2025" },
  { name: "Elina Smith", sub: "Paid", date: "July 28, 2025" },
  { name: "Jhon Deo", sub: "Free", date: "Aug 01, 2025" },
  { name: "Mike Jhonson", sub: "Paid", date: "Aug 09, 2025" },
  { name: "Anna Williams", sub: "Free", date: "Aug 12, 2025" },
];

const RecentUsers = () => {
  return (
    <div className="bg-[#FFFDFD] p-4 rounded-lg shadow-sm border border-[#E4572E]/15 h-full">
      <h2 className="font-medium text-lg mb-5 text-[#2E2E2E]">
        Recent User Signup
      </h2>
      <div className="w-full">
        {/* Header */}
        <div className="flex bg-white border border-[#DBCCC7]/50 rounded-lg shadow-sm text-[#2E2E2E] font-medium text-lg mb-4">
          <div className="flex-1 px-3 py-2">Client Name</div>
          <div className="flex-1 px-3 py-2">Subscription</div>
          <div className="flex-1 px-3 py-2">Date</div>
        </div>

        {/* Body */}
        {users.map((u, i) => (
          <div
            key={i}
            className="flex pl-2 text-base text-[#2E2E2E] font-medium pb-3"
          >
            <div className="flex-1 px-3 py-2">{u.name}</div>
            <div className="flex-1 px-3 py-2">
              <span
                className={`px-3 py-2 rounded-full text-white text-xs ${
                  u.sub === "Paid" ? "bg-green-600" : "bg-red-500"
                }`}
              >
                {u.sub}
              </span>
            </div>
            <div className="flex-1 px-3 py-2">{u.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUsers;
