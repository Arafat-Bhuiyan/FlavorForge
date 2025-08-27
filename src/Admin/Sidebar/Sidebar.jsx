export const Sidebar = ({ currentComponent, onMenuClick }) => {
  const dashboard = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
    >
      <path
        fill="#2E2E2E"
        d="M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6zm2-10h4V5H5zm10 8h4v-6h-4zm0-12h4V5h-4zM5 19h4v-2H5zm4-2"
      ></path>
    </svg>
  );
  const user = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
    >
      <path
        fill="#2E2E2E"
        d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
      ></path>
    </svg>
  );
  const subscription = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
    >
      <path
        fill="#2E2E2E"
        d="M20 8H4V6h16zm-2-6H6v2h12zm4 10v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2m-6 4l-6-3.27v6.53z"
      />
    </svg>
  );
  const ai = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="#2E2E2E"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19c1.2-3.678 2.526-5.005 6-6c-3.474-.995-4.8-2.322-6-6c-1.2 3.678-2.526 5.005-6 6c3.474.995 4.8 2.322 6 6Zm-8-9c.6-1.84 1.263-2.503 3-3c-1.737-.497-2.4-1.16-3-3c-.6 1.84-1.263 2.503-3 3c1.737.497 2.4 1.16 3 3Zm1.5 10c.3-.92.631-1.251 1.5-1.5c-.869-.249-1.2-.58-1.5-1.5c-.3.92-.631 1.251-1.5 1.5c.869.249 1.2.58 1.5 1.5Z"
      ></path>
    </svg>
  );
  const settings = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
    >
      <path
        fill="#2E2E2E"
        d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zM11 20h1.975l.35-2.65q.775-.2 1.438-.587t1.212-.938l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12t-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587zm1.05-4.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5M12 12"
      ></path>
    </svg>
  );
  const plan = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
    >
      <path
        fill="#2e2e2e"
        d="M6 2.25A2.75 2.75 0 0 0 3.25 5v14A2.75 2.75 0 0 0 6 21.75h7a.75.75 0 0 0 0-1.5H6c-.69 0-1.25-.56-1.25-1.25V5c0-.69.56-1.25 1.25-1.25h10c.69 0 1.25.56 1.25 1.25v5.5a.75.75 0 0 0 1.5 0V5A2.75 2.75 0 0 0 16 2.25z"
      ></path>
      <path
        fill="#2e2e2e"
        d="M7 10.25a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zm3 0a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5zm-3 3a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zm3 0a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5zm-3 3a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zm3 0a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 0-1.5z"
      ></path>
      <path
        fill="#2e2e2e"
        d="M6.076 5.617C6 5.801 6 6.034 6 6.5s0 .699.076.883a1 1 0 0 0 .541.54C6.801 8 7.034 8 7.5 8h7c.466 0 .699 0 .883-.076a1 1 0 0 0 .54-.541C16 7.199 16 6.966 16 6.5s0-.699-.076-.883a1 1 0 0 0-.541-.54C15.199 5 14.966 5 14.5 5h-7c-.466 0-.699 0-.883.076a1 1 0 0 0-.54.541M18.75 14a.75.75 0 0 0-1.5 0v.417h-.087c-.957 0-1.913.7-1.913 1.766c0 .444.12.852.421 1.173c.278.295.633.431.908.513l2.418.701c.092.027.153.052.193.072a.3.3 0 0 1 .042.026l.002.004a.5.5 0 0 1 .016.145c0 .037-.016.093-.084.154a.5.5 0 0 1-.33.112h-1.505c-.419 0-.581-.274-.581-.416a.75.75 0 0 0-1.5 0c0 1.12.973 1.877 2 1.915V21a.75.75 0 0 0 1.5 0v-.417h.087c.957 0 1.913-.7 1.913-1.766c0-.444-.12-.852-.421-1.173c-.278-.295-.633-.431-.908-.513l-2.418-.701a1 1 0 0 1-.193-.072a.3.3 0 0 1-.042-.026l-.002-.004a.5.5 0 0 1-.016-.145c0-.037.016-.093.084-.154a.5.5 0 0 1 .33-.112h1.505c.419 0 .581.274.581.416a.75.75 0 0 0 1.5 0c0-1.12-.973-1.877-2-1.915z"
        opacity={0.5}
      ></path>
    </svg>
  );
  const logout = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={26}
      viewBox="0 0 24 24"
    >
      <path fill="#FDFDFD" d="M12 20a8 8 0 1 1 0-16z" opacity={0.5}></path>
      <path
        fill="#FDFDFD"
        fillRule="evenodd"
        d="M16.47 8.47a.75.75 0 0 0 0 1.06l1.72 1.72H10a.75.75 0 0 0 0 1.5h8.19l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0"
        clipRule="evenodd"
      ></path>
    </svg>
  );
  const menuItems = [
    { icon: dashboard, label: "Dashboard", active: true },
    { icon: user, label: "Users" },
    { icon: subscription, label: "Subscription" },
    { icon: plan, label: "Plan Management" },
    { icon: ai, label: "AI Usage Logs" },
    { icon: settings, label: "Settings" },
  ];
  return (
    <div className="w-64 bg-[#FAF3E0] shadow-sm relative">
      {/* Logo */}
      <div className="p-6">
        <img
          src="/public/FlavorForgeLogo.png"
          className="w-[93px] h-[71px] mx-auto"
          alt=""
        />
      </div>

      {/* Navigation */}
      <nav className="">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentComponent === item.label;
            return (
              <li key={index}>
                <button
                  onClick={() => onMenuClick(item.label)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                    isActive ? "bg-white text-[#2E2E2E]" : "text-[#2E2E2E]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-normal text-xl">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center justify-center mx-auto px-4 pb-4">
          <button className="flex items-center space-x-3 px-3 py-2 text-[#FDFDFD] bg-[#E4572E] rounded-full transition-colors">
            {logout()}
            <span className="font-medium text-xl">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
