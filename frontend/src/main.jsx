import { createRoot } from "react-dom/client";
import { Flowbite } from "flowbite-react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/pages/auth/SignUp";
import Login from "./components/pages/auth/Login";
import Home from "./components/pages/home/Home";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

const customTheme = {
  label: {
    root: {
      colors: {
        default: "text-zicn-700 text-lg",
      },
    },
  },
  textInput: {
    field: {
      input: {
        sizes: {
          default: "p-4",
        },
        colors: {
          default: "bg-gray-100 focus:outline-none border-none",
        },
      },
    },
  },
  button: {
    color: {
      default: "bg-gradient-to-r from-amber-600 to-amber-400 text-white",
    },
    size: {
      default: "p-3",
    },
  },
};

createRoot(document.getElementById("root")).render(
  <Flowbite theme={{ theme: customTheme }}>
    <RouterProvider router={router} />
  </Flowbite>
);
