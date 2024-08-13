import { Label, TextInput, Button } from "flowbite-react";
import { FaRegEyeSlash } from "react-icons/fa";

const SignUp = () => {
  return (
    <>
      <div className="h-screen grid grid-cols-12">
        <div className="col-span-4 flex flex-col justify-between text-zinc-700 p-20">
          <div>
            <h1 className="text-6xl font-bold">Sign up</h1>
            <p className="text-xl mt-3">Hi! create your account first buddy</p>
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
                    <TextInput
                      className="w-full"
                      color="password"
                      id="password"
                      name="password"
                      type="password"
                      placeholder="enter your password"
                      autoComplete="off"
                      required
                    />
                    <FaRegEyeSlash className="w-6 h-6" />
                  </div>
                </li>
                <li>
                  <Button className="w-full" color="default" size="lg">
                    Sign up
                  </Button>
                </li>
              </ul>
            </form>
          </div>
          <p>&#169; Joan | All rights reserved</p>
        </div>
        <div className="authBackground bg-no-repeat bg-cover bg-center col-span-8 p-20 text-white">
          <h1 className="text-6xl font-bold">Say it</h1>
          <p className="text-xl mt-3">just say what do you wanna say</p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
