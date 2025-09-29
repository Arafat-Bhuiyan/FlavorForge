import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import logo from "/public/FlavorForgeLogo.png";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../../Provider/Provider";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, handleGoogleLogin } = useContext(MyContext);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
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
    console.log("Email", email);
    console.log("password", password);
    try {
      await login({ email, password }); // Use the login function from context

      setEmail("");
      setPassword("");
      navigate("/"); // Redirect after login
    } catch (error) {
      console.error("Login Error", error);
      toast.error("Login failed. Please try again.");
    }
  };

const handleSocialLogin = async () => {
  try {
    await handleGoogleLogin(); 
    toast.success("Logged in with Google!");
  } catch (error) {
    toast.error("Google login failed!");
  }
};

  return (
    <div className="flex items-center justify-center px-4 mt-14 mb-32">
      <div className="w-full max-w-xl max-h-screen">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16">
              <img src={logo} alt="" />
            </div>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleSocialLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition-colors mb-4"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-gray-700 font-medium">
              Log in with Google
            </span>
          </button>

          {/* Divider */}
          <div className="text-center text-gray-500 text-sm my-4">
            Or continue with email
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
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

            {/* Password Input */}
            <div className="mb-2">
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

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            {/* Forgot Password */}
            <div className="text-right mb-6">
              <Link
                to="/forget-password"
                className="text-sm text-[#E4572E] hover:text-[#f55423]"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Log In Button */}
            <button
              type="submit"
              className="w-full bg-[#E4572E] hover:bg-[#f55423] text-white font-medium py-3 px-4 rounded-lg transition-colors mb-6"
            >
              Log in
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center text-sm text-gray-600">
            Do not have an account yet?{" "}
            <Link
              to="/signup"
              className="text-[#E4572E] hover:text-[#f55423] font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
