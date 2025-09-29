import { useLocation, useNavigate, Link } from "react-router-dom";
import logo from "/FlavorForgeLogo.png";
import { Settings } from "lucide-react";
import { MyContext } from "../../Provider/Provider";
import { useContext, useEffect } from "react";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const goToProfileSetting = () => navigate("/profile-settings");
  const goToSettings = () => navigate("/settings");
  const { user, logout } = useContext(MyContext);

  if (user) {
    console.log(user);
  }

  useEffect(() => {
    console.log("USER",user);
  }, [user]);
  return (
    <div className="pb-16">
      <div className="flex justify-between items-center">
        <Link to="/">
          <img src={logo || "/placeholder.svg"} alt="" className="w-16 h-14" />
        </Link>

        <div className="flex gap-10 font-medium text-lg items-center">
          <Link
            to="/"
            className={
              pathname === "/"
                ? "px-4 py-2 bg-[#E4572E] text-white rounded"
                : "px-4 py-2 text-gray-700 hover:text-[#E4572E]"
            }
          >
            Home
          </Link>

          <a
            href="/#how-it-works"
            className="px-4 py-2 text-gray-700 hover:text-[#E4572E]"
          >
            How it Works
          </a>

          <a
            href="/#faqs"
            className="px-4 py-2 text-gray-700 hover:text-[#E4572E]"
          >
            FAQs
          </a>
        </div>

        <div className="flex gap-3 font-medium text-base items-center">
          {user ? (
            <div className="flex items-center gap-4">
              <div onClick={goToProfileSetting} className="cursor-pointer">
                <img
                  src={user?.image_url || "https://i.ibb.co.com/cK8Kz98s/da7ed7b0-5f66-4f97-a610-51100d3b9fd2.jpg" }
                  alt="profile"
                  className="w-12 h-12 ring-2 ring-[#E4572E] rounded-full"
                />
              </div>
              <div
                onClick={goToSettings}
                className="bg-[#E4572E]/30 flex items-center justify-center rounded-full w-12 h-12 cursor-pointer"
              >
                <Settings />
              </div>
              <button
                onClick={logout}
                className="bg-[#FFF8EA] border border-[#E4572E]/40 p-3 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#2e2e2e"
                    d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6q.425 0 .713.288T12 4t-.288.713T11 5H5v14h6q.425 0 .713.288T12 20t-.288.713T11 21zm12.175-8H10q-.425 0-.712-.288T9 12t.288-.712T10 11h7.175L15.3 9.125q-.275-.275-.275-.675t.275-.7t.7-.313t.725.288L20.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.712.288t-.713-.313q-.275-.3-.262-.712t.287-.688z"
                  ></path>
                </svg>
              </button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="w-24 h-10 border border-[#E4572E]/40 bg-[#FFF8EA] rounded-lg">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="w-24 h-10 bg-[#E4572E] text-white rounded-lg">
                  Sign up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
