import React, { useState } from "react";
import FormInput from "../../components/FormInput";
import useForgetPassword from "../../hooks/auth/useForgetPassword";
import Loading from "../../components/Loading";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { loading, forgotPassword } = useForgetPassword();
  return (
    <div className="bg-white p-5 rounded-lg md:w-1/3 w-11/12 flex flex-col items-center">
      <h1 className="text-xl font-semibold text-black">Reset Password</h1>
      <div className="w-full my-5">
        <label className="form-label text-black">{"Email"}</label>
        <FormInput
          title={"Email"}
          type={"email"}
          placeholder={"Enter Registered Email"}
          value={email}
          onchange={(e) => setEmail(e.target.value)}
        />
        <button
          className="p-2 w-full btn-bg rounded-lg font-semibold mt-3"
          onClick={() => forgotPassword({ email })}
          disabled={loading}
        >
          Submit
        </button>
        {loading && <Loading />}
      </div>
    </div>
  );
}
