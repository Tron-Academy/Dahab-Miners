import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="px-5 md:px-10 lg:px-[120px] py-20 footer-bg">
      <div className="flex lg:flex-row flex-col gap-10 justify-between items-start lg:items-center">
        <div className="flex flex-col gap-7">
          <div className="w-[170px] h-[170px] rounded-md overflow-hidden">
            <img
              src="/footerlogo.png"
              alt="asic-miners-in-abu-dhabi-UAE-for-new-miners"
              title="Dahab Miners is the premier crypto mining service in UAE Explore our Bitcoin machines in Abu Dhabi and maximize your cryptocurrency earnings!"
            ></img>
          </div>
          <div className="flex md:flex-row flex-col gap-5 text-base font-medium text-white">
            <Link to={"/buy"}>Buy Miners</Link>
            <Link to={"/host"}>Host Mining</Link>
            <Link to={"/repair"}>Miner Repair</Link>
            <Link to={"/blogs"}>Blogs</Link>
          </div>
        </div>
        <div className="bg-[#030815] rounded-md p-5">
          <p className="text-lg font-semibold text-white">Contact Us</p>
          <div className="flex flex-col gap-7 text-base font-medium text-white my-5">
            <div className="flex gap-3 items-center">
              <div>
                <CiLocationOn />
              </div>
              <p>
                Plaza 30, Unit 2B-SF - شارع دلما - Abu Dhabi - United Arab
                Emirates
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <div>
                <CiMail />
              </div>
              <p>Rizwan@dahabminers.ae</p>
            </div>
            <div className="flex gap-3 items-center">
              <div>
                <CiPhone />
              </div>
              <p>+971568145866</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-white my-5"></div>
      <div className="flex md:flex-row flex-col justify-between items-center">
        <div className="flex gap-5 text-base font-normal text-white">
          <a href="https://www.instagram.com/dahabminersuae/" target="_blank">
            Instagram
          </a>
          <a href="https://www.facebook.com/dahabminers" target="_blank">
            Facebook
          </a>
          {/* <a href="">Youtube</a> */}
          <a
            href="https://www.linkedin.com/company/thedahab-miners"
            target="_blank"
          >
            Linkedin
          </a>
        </div>
        <p className="text-[#667085] text-base font-normal">
          © 2024 Dahab Miners. All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
