import React, { useState } from "react";
import FormInput from "../../components/FormInput";
import useResetPassword from "../../hooks/auth/useResetPassword";
import Loading from "../../components/Loading";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, resetPassword } = useResetPassword();
  return (
    <div className="bg-white p-5 rounded-lg md:w-1/3 w-11/12 flex flex-col items-center">
      <h1 className="text-xl font-semibold ">Enter new Password</h1>
      <div className="w-full my-5">
        <FormInput
          title={"Email"}
          type={"email"}
          placeholder={"Enter Email"}
          value={email}
          onchange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          title={"Verification Code"}
          type={"number"}
          value={verificationCode}
          onchange={(e) => setVerificationCode(e.target.value)}
        />
        <FormInput
          title={"New Password"}
          type={"password"}
          value={password}
          onchange={(e) => setPassword(e.target.value)}
        />
        <FormInput
          title={"Confirm Password"}
          type={"password"}
          value={confirmPassword}
          onchange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="p-2 w-full bg-btnGreen rounded-lg font-semibold mt-3 hover:bg-btnHover nav-link"
          onClick={() =>
            resetPassword({
              email,
              verificationCode,
              password,
              confirmPassword,
            })
          }
          disabled={loading}
        >
          Submit
        </button>
        {loading && <Loading />}
      </div>
    </div>
  );
}
