import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layouts/Layout";
import { Home } from "../pages/Home/Home";
import Login from "../pages/Auth/Login/Login";
import Signup from "../pages/Auth/Login/Signup";
import { ForgetPassword } from "../pages/Auth/Login/ForgetPassword";
import ProfileSettings from "../pages/Profile/ProfileSettings";
import PopularRecipe from "../pages/PopularRecipe/PopularRecipe";

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
        element: <ProfileSettings />,
      },
      {
        path: "/popular-recipe",
        element: <PopularRecipe />,
      },
    ],
  },
]);

export default router;
