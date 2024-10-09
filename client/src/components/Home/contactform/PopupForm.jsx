import React, { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import { IoMdClose } from "react-icons/io";
const PopupForm = ({ showPopup, setShowPopup }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };
  return (
    <div>
      {showPopup && (
        <div className="popup-form lg:w-1/2 w-5/6 overflow-auto h-3/4 rounded-lg">
          <div className="popup-content">
            <div
              className="text-xl text-red-500 font-semibold flex justify-end w-full"
              onClick={closePopup}
            >
              <IoMdClose />
            </div>
            <ContactForm popup />
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupForm;
