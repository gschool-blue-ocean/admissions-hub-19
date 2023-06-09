import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/errorPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Interview from "./pages/Interview";
import 'bootstrap/dist/css/bootstrap.min.css';
import EditProfile from "./pages/EditProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "interview",
          element: <Interview />,
        },
        {
          path: "editprofile",
          element: <EditProfile />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
      ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
