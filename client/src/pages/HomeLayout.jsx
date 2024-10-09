import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsApp from "../components/WhatsApp";
import PopupForm from "../components/Home/contactform/PopupForm";
import EnquireButton from "../components/Home/contactform/EnquireButton";

export default function HomeLayout() {
  return (
    <div className="mx-0 overflow-x-hidden">
      <div className="sticky top-0 z-50">
        <Header />
        <WhatsApp />

        <EnquireButton />
      </div>
      <div className="">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
