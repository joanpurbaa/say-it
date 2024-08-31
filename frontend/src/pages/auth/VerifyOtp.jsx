import { useState } from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import AuthRightSection from "../../components/AuthRightSection";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpInput from "react-otp-input";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/verifyotp").then((res) => {
        res.data.status == 200 ? navigate("/login") : toast.error(res.data.error);
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
            <h1 className="text-6xl font-bold">Verify your OTP</h1>
            <p className="text-xl mt-3">Hi! we just want to make sure</p>
            <form className="mt-14" method="post" onSubmit={submit}>
              <ul className="space-y-7">
                <li className="space-y-2">
                  <OtpInput
                    inputStyle="text-amber-400 text-6xl border border-amber-500 rounded-md focus:outline-none ms-0 mx-10"
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderInput={(props) => <input {...props} />}
                  />
                </li>
                <li>
                  <Button
                    type="submit"
                    className="w-full"
                    color="default"
                    size="default"
                  >
                    Verify
                  </Button>
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

export default VerifyOtp;
