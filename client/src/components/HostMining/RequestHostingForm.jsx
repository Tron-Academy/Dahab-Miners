import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { handleEnquiryFormClick } from "../../utils/whatsapp";

export default function RequestHostingForm() {
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, SetMessage] = useState("");
  return (
    <div className="lg:w-1/2 w-full flex flex-col gap-7">
      <h1 className="text-[40px] font-semibold gradient-heading">
        Request Hosting
      </h1>
      <div className="flex gap-3 items-center w-full">
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm font-medium text-[#344054]">
            First Name
          </label>
          <input
            className="p-2 border rounded-lg border-[#D0D5DD] w-full"
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm font-medium text-[#344054]">
            Last Name
          </label>
          <input
            className="p-2 border rounded-lg border-[#D0D5DD] w-full"
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#344054]">Email</label>
        <input
          className="p-2 border rounded-lg border-[#D0D5DD] w-full"
          type="email"
          placeholder="email@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#344054]">Phone</label>
        <PhoneInput
          country={"ae"} // Set default country code (UAE in this case)
          value={phone}
          onChange={setPhone}
          inputStyle={{
            padding: "20px",
            paddingLeft: "40px",
            width: "100%",
            borderColor: "#D0D5DD",
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#344054]">Message</label>
        <textarea
          className="p-2 border rounded-lg border-[#D0D5DD] w-full"
          value={message}
          onChange={(e) => SetMessage(e.target.value)}
          rows={6}
        />
      </div>
      <button
        className="text-base font-semibold bg-[#1ECBAF] text-white p-2 hover:bg-btnHover nav-link rounded-lg"
        onClick={() =>
          handleEnquiryFormClick({ firstName, lastName, message, phone, email })
        }
      >
        Send Message
      </button>
    </div>
  );
}
