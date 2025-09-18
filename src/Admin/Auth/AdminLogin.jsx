import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import logo from "/public/FlavorForgeLogo.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import profile from "../../assets/images/profile.png";
import { MyContext } from "../../Provider/Provider";


export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {login} = useContext(MyContext)
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters, include one uppercase letter and one number"
      );
      return;
    }

    setError("");
    toast.success("Login successful");

    login({
      name: "Admin",
      email,
      photoURL: profile,
    });

    setEmail("");
    setPassword("");
    navigate("/admin"); // go to admin dashboard
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fffbee] px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <img src={logo} alt="FlavorForge Logo" className="w-16 h-16" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4572E] focus:border-transparent"
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4572E] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#E4572E] hover:bg-[#f55423] text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
