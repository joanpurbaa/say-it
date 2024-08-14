import { Label, TextInput, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import AuthRightSection from "../../templates/AuthRightSection";
import PasswordInput from "../../atoms/PasswordInput";

const Login = () => {
  return (
    <>
      <div className="h-screen grid grid-cols-12">
        <div className="col-span-4 flex flex-col justify-between text-zinc-700 p-20">
          <div>
            <h1 className="text-6xl font-bold">Login</h1>
            <p className="text-xl mt-3">Hi! welcome back buddy</p>
            <form className="mt-14" action="">
              <ul className="space-y-7">
                <li className="space-y-2">
                  <Label
                    color="default"
                    className="text-zinc-700"
                    htmlFor="email"
                    value="Email"
                  />
                  <TextInput
                    color="default"
                    id="email"
                    name="email"
                    placeholder="enter your email"
                    autoComplete="off"
                    required
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
                    color="default"
                    id="username"
                    name="username"
                    placeholder="enter your username"
                    autoComplete="off"
                    required
                  />
                </li>
                <li className="space-y-2">
                  <Label
                    color="default"
                    className="text-zinc-700"
                    htmlFor="username"
                    value="password"
                  />
                  <div className="flex justify-normal items-center border-2 rounded-lg pr-2 focus-within:box-content focus-within:border-2 focus-within:border-amber-500">
                    <PasswordInput/>
                  </div>
                </li>
                <li>
                  <Button className="w-full" color="default" size="lg">
                    Login
                  </Button>
                </li>
                <li>
                  <p>
                    Don&apos;t have an account?{" "}
                    <Link className="text-amber-500" to="/signup">
                      sign up
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
    </>
  );
};

export default Login;
