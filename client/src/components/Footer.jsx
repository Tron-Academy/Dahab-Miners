import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import FooterLinks from "./FooterLinks";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] pt-5 bg-[#000618]"
      initial={{
        borderImageSource:
          "linear-gradient(to bottom right, #004DF480 0%, transparent 50%, transparent 50%, #0194FE80 100%)",
        borderWidth: "2px",
        borderImageSlice: 1,
        borderRadius: "12px",
        boxShadow: "0px 0px 20px rgba(1, 148, 254, 0.6)",
      }}
      style={{
        borderStyle: "solid",
      }}
    >
      <div className="flex lg:flex-row flex-col gap-10 justify-between items-start lg:items-center">
        <div className="flex flex-col">
          <a
            href="https://dahabminers.com/"
            className="w-[170px] h-[170px] rounded-md overflow-hidden"
          >
            <img
              src="/home/footerLogo.png"
              alt="asic-miners-in-abu-dhabi-UAE-for-new-miners"
              title="Dahab Miners is the premier crypto mining service in UAE Explore our Bitcoin machines in Abu Dhabi and maximize your cryptocurrency earnings!"
            ></img>
          </a>
          <div className="flex gap-5 text-base font-normal text-white">
            <FooterLinks
              link={"https://www.instagram.com/dahabminersuae/"}
              icon={<FaInstagram />}
            />
            <FooterLinks
              link={"https://www.facebook.com/dahabminers"}
              icon={<FaFacebookF />}
            />
            <FooterLinks
              link={"https://www.linkedin.com/company/thedahab-miners"}
              icon={<FaLinkedinIn />}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 text-sm font-medium text-white">
          <Link to={"/"}>Home</Link>
          <Link to={"/buy"}>Buy Miners</Link>
          <Link to={"/host"}>Host Mining</Link>
          <Link to={"/repair"}>Miner Repair</Link>
          <Link to={"/blogs"}>Blogs</Link>
        </div>
        <div className="bg-[#030815] rounded-md p-5 max-w-[400px]">
          <p className="text-lg font-semibold text-white lg:text-center text-left">
            Contact Us
          </p>
          <div className="flex flex-col gap-7 text-sm font-medium text-white my-5">
            <div className="flex sm:flex-row flex-col gap-5 justify-between items-start">
              <div className="flex gap-3 items-start">
                <div>
                  <CiLocationOn />
                </div>
                <p>
                  Plaza 30, Unit 2B-SF - شارع دلما - Abu Dhabi - United Arab
                  Emirates
                </p>
              </div>
              <div className="text-4xl font-thin h-10 border-l sm:block hidden"></div>
              <div className="flex gap-3 items-center">
                <div>
                  <CiLocationOn />
                </div>
                <p>Ethiopia</p>
              </div>
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

      <div className="flex md:flex-row flex-col justify-center items-center copyright-bg py-1">
        <p className="text-black text-xs font-normal text-center">
          © 2025 Dahab Miners. All Rights Reserved
        </p>
      </div>
    </motion.footer>
  );
}
