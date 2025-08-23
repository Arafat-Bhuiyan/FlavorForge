import logo from "/FlavorForgeLogo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/Login/AuthContext";
import profile from "../../assets/images/profile.png";

export const Navbar = () => {
  const navigate = useNavigate();

  const goToProfileSetting = () => {
    navigate("/profile-settings");
  };
  const { user, logout } = useAuth();
  return (
    <div className="pb-16">
      <div className="flex justify-between items-center">
        <img src={logo} alt="" className="w-16 h-14" />

        <div className="flex gap-10 font-medium text-lg items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 bg-[#E4572E] text-white rounded"
                : "px-4 py-2 text-gray-700 hover:text-[#E4572E]"
            }
          >
            Home
          </NavLink>

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
              <div className="bg-[#E4572E]/30 flex items-center justify-center rounded-full w-12 h-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#2E2E2E"
                    fillRule="evenodd"
                    d="M13.984 2.542c.087.169.109.386.152.82c.082.82.123 1.23.295 1.456a1 1 0 0 0 .929.384c.28-.037.6-.298 1.238-.82c.337-.277.506-.415.687-.473a1 1 0 0 1 .702.035c.175.076.33.23.637.538l.894.894c.308.308.462.462.538.637a1 1 0 0 1 .035.702c-.058.181-.196.35-.472.687c-.523.639-.784.958-.822 1.239a1 1 0 0 0 .385.928c.225.172.636.213 1.457.295c.433.043.65.065.82.152a1 1 0 0 1 .47.521c.071.177.071.395.071.831v1.264c0 .436 0 .654-.07.83a1 1 0 0 1-.472.522c-.169.087-.386.109-.82.152c-.82.082-1.23.123-1.456.295a1 1 0 0 0-.384.929c.038.28.299.6.821 1.238c.276.337.414.505.472.687a1 1 0 0 1-.035.702c-.076.175-.23.329-.538.637l-.894.893c-.308.309-.462.463-.637.538a1 1 0 0 1-.702.035c-.181-.058-.35-.196-.687-.472c-.639-.522-.958-.783-1.238-.82a1 1 0 0 0-.929.384c-.172.225-.213.635-.295 1.456c-.043.434-.065.651-.152.82a1 1 0 0 1-.521.472c-.177.07-.395.07-.831.07h-1.264c-.436 0-.654 0-.83-.07a1 1 0 0 1-.522-.472c-.087-.169-.109-.386-.152-.82c-.082-.82-.123-1.23-.295-1.456a1 1 0 0 0-.928-.384c-.281.037-.6.298-1.239.82c-.337.277-.506.415-.687.473a1 1 0 0 1-.702-.035c-.175-.076-.33-.23-.637-.538l-.894-.894c-.308-.308-.462-.462-.538-.637a1 1 0 0 1-.035-.702c.058-.181.196-.35.472-.687c.523-.639.784-.958.821-1.239a1 1 0 0 0-.384-.928c-.225-.172-.636-.213-1.457-.295c-.433-.043-.65-.065-.82-.152a1 1 0 0 1-.47-.521C2 13.286 2 13.068 2 12.632v-1.264c0-.436 0-.654.07-.83a1 1 0 0 1 .472-.522c.169-.087.386-.109.82-.152c.82-.082 1.231-.123 1.456-.295a1 1 0 0 0 .385-.928c-.038-.281-.3-.6-.822-1.24c-.276-.337-.414-.505-.472-.687a1 1 0 0 1 .035-.702c.076-.174.23-.329.538-.637l.894-.893c.308-.308.462-.463.637-.538a1 1 0 0 1 .702-.035c.181.058.35.196.687.472c.639.522.958.783 1.238.821a1 1 0 0 0 .93-.385c.17-.225.212-.635.294-1.456c.043-.433.065-.65.152-.82a1 1 0 0 1 .521-.471c.177-.07.395-.07.831-.07h1.264c.436 0 .654 0 .83.07a1 1 0 0 1 .522.472M12 16a4 4 0 1 0 0-8a4 4 0 0 0 0 8"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>

              <div onClick={goToProfileSetting}>
                <img
                  src={user.photoURL || profile} // default avatar
                  alt="profile"
                  className="w-12 h-12 ring-2 ring-[#E4572E] rounded-full"
                />
              </div>
              {/* <button onClick={logout} className="text-sm text-red-500">
                Logout
              </button> */}
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
