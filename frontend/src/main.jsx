import { createRoot } from "react-dom/client";
import { Flowbite } from "flowbite-react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/pages/auth/SignUp";
import Login from "./components/pages/auth/Login";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
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
        colors: {
          default: "bg-white border-2 focus:outline-amber-500",
          password: "border-0 focus:outline-none",
        },
      },
    },
  },
  button: {
    color: {
      default: "bg-gradient-to-r from-amber-600 to-amber-400 text-white",
    },
  },
};

createRoot(document.getElementById("root")).render(
  <Flowbite theme={{ theme: customTheme }}>
    <RouterProvider router={router} />
  </Flowbite>
);
