import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Interview from "./pages/Interview/Interview";
import EditProfile from "./pages/EditProfile";
import StudentInterview from "./pages/StudentInterview";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

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
        path: "interview",
        element: <Interview />,
      },
      {
        path: "editprofile",
        element: <EditProfile />,
      },
    ],
    loader: async () => {
      const token = localStorage.getItem("token");
      const userid = localStorage.getItem("userid");
      return [token, userid];
    },
  },
  // we're removing login and signup elements from "App" because when we "start up" the app, we don't want to see login and signup elements.
  // we want to see the login and signup elements at the initial page load, before logging in.
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "studentinterview",
    element: <StudentInterview />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
