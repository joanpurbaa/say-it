import { useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import AuthRightSection from "../../components/AuthRightSection";
import PasswordInput from "../../components/PasswordInput";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:3000/signup", {
          email,
          username,
          password,
        })
        .then(async (res) => {
          if (res.data.status == 201) {
            await axios.post("http://localhost:3000/sendotp");
            navigate("/verify");
          } else {
            toast.error(res.data.error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-screen grid grid-cols-12">
        <div className="col-span-4 flex flex-col justify-between text-zinc-700 p-20">
          <div>
            <h1 className="text-6xl font-bold">Sign up</h1>
            <p className="text-xl mt-3">Hi! create your account first buddy</p>
            <form className="mt-14" method="post" onSubmit={submit}>
              <ul className="space-y-7">
                <li className="space-y-2">
                  <Label
                    color="default"
                    className="text-zinc-700"
                    htmlFor="email"
                    value="Email"
                  />
                  <TextInput
                    sizing="default"
                    color="default"
                    id="email"
                    name="email"
                    placeholder="enter your email"
                    autoComplete="off"
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </li>
                <li className="space-y-2">
                  <Label
                    color="default"
                    className="text-zinc-700"
                    htmlFor="username"
                    value="Username"
                  />
                  <TextInput
                    sizing="default"
                    color="default"
                    id="username"
                    name="username"
                    placeholder="enter your username"
                    autoComplete="off"
                    required
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </li>
                <li className="space-y-2">
                  <Label
                    color="default"
                    className="text-zinc-700"
                    htmlFor="username"
                    value="password"
                  />
                  <div className="flex justify-normal items-center bg-gray-100 rounded-lg pr-4">
                    <PasswordInput
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </li>
                <li>
                  <Button
                    type="submit"
                    className="w-full"
                    color="default"
                    size="default"
                  >
                    Sign up
                  </Button>
                </li>
                <li>
                  <p>
                    Have an account?{" "}
                    <Link className="text-amber-500" to="/login">
                      login
                    </Link>
                  </p>
                </li>
              </ul>
            </form>
          </div>
          <p>&#169; Joan | All rights reserved</p>
        </div>
        <div className="authBackground bg-no-repeat bg-cover bg-center col-span-8 p-20 text-white">
          <AuthRightSection />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUp;
