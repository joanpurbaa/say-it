/* eslint-disable react/prop-types */
import { useState } from "react";
import { TextInput } from "flowbite-react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const PasswordInput = (props) => {
  let [inputType, setInputType] = useState(false);

  const changeInputType = () => {
    !inputType ? setInputType(true) : setInputType(false);
  };

  return (
    <>
      {inputType ? (
        <>
          <TextInput
            className="w-full"
            sizing="default"
            color="default"
            id="password"
            name="password"
            type="text"
            placeholder="enter your password"
            autoComplete="off"
            required
            onChange={props.onChange}
            value={props.value}
          />
          <FaRegEye
            className="w-6 h-6 cursor-pointer"
            onClick={changeInputType}
          />
        </>
      ) : (
        <>
          <TextInput
            className="w-full"
            sizing="default"
            color="default"
            id="password"
            name="password"
            type="password"
            placeholder="enter your password"
            autoComplete="off"
            required
            onChange={props.onChange}
            value={props.value}
          />
          <FaRegEyeSlash
            className="w-6 h-6 cursor-pointer"
            onClick={changeInputType}
          />
        </>
      )}
    </>
  );
};

export default PasswordInput;
