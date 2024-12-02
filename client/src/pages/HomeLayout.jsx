import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsApp from "../components/WhatsApp";

import EnquireButton from "../components/Home/contactform/EnquireButton";

export default function HomeLayout() {
  return (
    <div className="mx-0 ">
      <div className="sticky top-0 z-50 ">
        <Header />
        <WhatsApp />
        {/* <EnquireButton /> */}
      </div>
      <div className="overflow-x-hidden">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
