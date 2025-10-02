import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layouts/Layout";
import { Home } from "../pages/Home/Home";
import Login from "../pages/Auth/Login/Login";
import Signup from "../pages/Auth/Login/Signup";
import { ForgetPassword } from "../pages/Auth/Login/ForgetPassword";
import ProfileSettings from "../pages/Profile/ProfileSettings";
import PopularRecipe from "../pages/PopularRecipe/PopularRecipe";
import Subscribe from "../pages/Subscription/Subscribe";
import Chatbot from "../pages/ChatBot/Chatbot";
import { Settings } from "../pages/Settings/Settings";
import Terms from "../pages/Settings/Terms";
import Policy from "../pages/Settings/Policy";
import ProtectedRouteUser from "../pages/Auth/Login/ProtectedRouteUser";
import ThankYou from "../pages/Subscription/ThankYou";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <h2>Route not found</h2>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/how-it-works",
        element: <div>How it works</div>,
      },
      {
        path: "/faqs",
        element: <div>FAQs</div>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/profile-settings",
        element: (
          <ProtectedRouteUser>
            <ProfileSettings />
          </ProtectedRouteUser>
        ),
      },
      {
        path: "/popular-recipe",
        element: <PopularRecipe />,
      },
      {
        path: "/subscription",
        element: <Subscribe />,
      },
      {
        path: "/payment/success",
        element: <ThankYou />,
      },
      {
        path: "/chatbot",
        element: <Chatbot />,
      },
      {
        path: "/settings",
        element: (
          <ProtectedRouteUser>
            <Settings />
          </ProtectedRouteUser>
        ),
      },
      {
        path: "/terms&conditions",
        element: (
          <ProtectedRouteUser>
            <Terms />
          </ProtectedRouteUser>
        ),
      },
      {
        path: "/privacy-policy",
        element: (
          <ProtectedRouteUser>
            <Policy />
          </ProtectedRouteUser>
        ),
      },
    ],
  },
]);

export default router;
