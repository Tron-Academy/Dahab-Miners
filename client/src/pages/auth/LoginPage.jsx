import React, { useState } from "react";
import FormInput from "../../components/FormInput";
import { Link } from "react-router-dom";
import useLoginUser from "../../hooks/auth/useLoginUser";
import Loading from "../../components/Loading";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLoginUser();
  const handleClick = () => {
    login({ email, password });
  };
  return (
    <div className="bg-white p-5 rounded-lg md:w-1/3 w-11/12 flex flex-col items-center">
      <h1 className="text-xl font-semibold text-black">Admin Login</h1>
      <div className="w-full my-5">
        <label className="form-label text-black">{"Email"}</label>
        <FormInput
          title={"Email"}
          type={"email"}
          value={email}
          onchange={(e) => setEmail(e.target.value)}
        />
        <label className="form-label text-black">{"Password"}</label>
        <FormInput
          title={"Password"}
          type={"password"}
          value={password}
          onchange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleClick}
          disabled={loading}
          className="p-2 w-full btn-bg rounded-lg font-semibold mt-3"
        >
          Login
        </button>
        {loading && <Loading />}
      </div>
      <Link to={"/auth/forgot-password"} className="text-blue-700">
        Forgot Password?
      </Link>
    </div>
  );
}
