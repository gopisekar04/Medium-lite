import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SigninInput } from "@gopi_0104/medium-common/dist";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function AuthSignup() {
  const navigate = useNavigate();
  const [postInput, setPostInput] = useState<SigninInput>({
    email: "",
    password: "",
  });

  const sendRequest = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
        ...postInput,
      });

      const { jwt } = res.data;

      if (jwt) {
        localStorage.setItem("jwt", jwt);
        navigate("/blogs");
      }
    } catch (e) {
      console.log("invalid Credentials");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <div className="w-80">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sign in to your account</h1>
          <p className="text-sm font-light mt-2">
            Dont have an account?{" "}
            <Link className="pl-2 underline" to={"/signup"}>
              Signup
            </Link>
          </p>
        </div>
        <form className="flex flex-col mt-3 ">
          <LabeledInput
            label="Email"
            placeholder="user@gmail.com"
            onChange={(e) => {
              setPostInput({
                ...postInput,
                email: e.target.value,
              });
            }}
            value={postInput.email}
          />

          <LabeledInput
            label="Password"
            placeholder="123456"
            onChange={(e) => {
              setPostInput({
                ...postInput,
                password: e.target.value,
              });
            }}
            value={postInput.password}
            type="password"
          />
          <div className="flex justify-center ">
            <button
              onClick={sendRequest}
              type="button"
              className=" w-full mt-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface LabeledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type?: string;
}

const LabeledInput = ({
  label,
  placeholder,
  onChange,
  value,
  type,
}: LabeledInputType) => {
  return (
    <div className="mt-5">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text- ">
        {label}
      </label>
      <input
        type={type || "text"}
        onChange={onChange}
        value={value}
        className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:grey-blue-500 dark:focus:border-grey-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
};
