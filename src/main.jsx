import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router/Routes.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./pages/Auth/Login/AuthContext.jsx";
import { MyProvider } from "./Provider/Provider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MyProvider>
      <ToastContainer autoClose={3000} />
      <RouterProvider router={router} />
    </MyProvider>
  </StrictMode>
);
