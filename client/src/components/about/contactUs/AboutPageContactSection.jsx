import React, { useState } from "react";
import FormInput from "../../FormInput";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./PhoneInputCustomStyles.css";
import { handleEnquiryFormClick } from "../../../utils/whatsapp";
import { CiLocationOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import ContactDetailSingleElt from "./ContactDetailSingleElt";

export default function AboutPageContactSection() {
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, SetMessage] = useState("");
  return (
    <section className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10">
      <div className="flex lg:flex-row flex-col justify-between items-center gap-10 p-10 customborder">
        <div className="flex flex-col gap-5 lg:w-1/2 w-full">
          <h5 className="text-[#0194FE] font-semibold text-3xl lg:text-left text-center">
            Contact Us
          </h5>
          <p className="text-[#A1D3F8] lg:text-left text-center">
            Thank you for getting in touch!
            <br /> Kindly. Fill the form, have a great day!
          </p>
          <div>
            <div>
              <FormInput
                type={"text"}
                placeholder={"First Name"}
                value={firstName}
                onchange={(e) => setFirstName(e.target.value)}
              />
              <FormInput
                type={"text"}
                placeholder={"Last Name"}
                value={lastName}
                onchange={(e) => setLastName(e.target.value)}
              />
            </div>
            <FormInput
              type={"email"}
              placeholder={"Email"}
              value={email}
              onchange={(e) => setEmail(e.target.value)}
            />
            <PhoneInput
              country={"ae"} // Set default country code (UAE in this case)
              value={phone}
              onChange={setPhone}
              inputStyle={{
                padding: "20px",
                paddingLeft: "40px",
                color: "black",
                width: "100%",
                borderColor: "#D0D5DD",
              }}
            />
            <textarea
              className="p-2 my-4 border rounded-lg border-[#D0D5DD] w-full"
              rows={"6"}
              value={message}
              onChange={(e) => SetMessage(e.target.value)}
            />
            <button
              className="px-4 py-2 rounded-full btn-bg w-full"
              onClick={() =>
                handleEnquiryFormClick({
                  firstName,
                  lastName,
                  email,
                  phone,
                  message,
                })
              }
            >
              Send Message
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center item-center gap-5 lg:w-1/2 w-full">
          <img
            src="/about/contact.jpg"
            className="lg:max-w-[400px] max-w-[300px] rounded-lg mx-auto"
          />
          <div className="flex justify-center lg:ms-auto mx-auto items-center gap-5 max-w-[500px]">
            <div className="flex flex-col gap-3">
              <ContactDetailSingleElt
                icon={<CiLocationOn />}
                content={
                  "Plaza 30, Unit 2B-SF - شارع دلما - Abu Dhabi - United Arab Emirates"
                }
              />
              <ContactDetailSingleElt
                icon={<CiLocationOn />}
                content={"Ethiopia"}
              />
              <ContactDetailSingleElt
                icon={<CiMail />}
                content={"Rizwan@dahabminers.ae"}
              />
              <ContactDetailSingleElt
                icon={<CiPhone />}
                content={"+971568145866"}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
