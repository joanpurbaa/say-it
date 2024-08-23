import { createRoot } from "react-dom/client";
import { Flowbite } from "flowbite-react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import axios from "axios";

axios.defaults.withCredentials = true;

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
      logout: "bg-red-500 text-white",
      add: "bg-amber-700 text-white",
      cancelLogout: "bg-white text-zinc-700",
    },
    size: {
      default: "p-3",
    },
  },
  textarea: {
    colors: {
      default: "bg-amber-500 focus:outline-none",
    },
  },
};

createRoot(document.getElementById("root")).render(
  <Flowbite theme={{ theme: customTheme }}>
    <RouterProvider router={router} />
  </Flowbite>
);
