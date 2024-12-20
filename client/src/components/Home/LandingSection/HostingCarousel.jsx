import React from "react";
import svgbg from "../../../assets/homebg.svg";
import ProgressBar from "./ProgressBar";
import PgBar from "./PbBar";
import CarouselNavigation from "./CarouselNavigation";
import { handleChatClick } from "../../../utils/whatsapp";
import { motion } from "framer-motion";
function HostingCarousel({ setItem, item }) {
  return (
    <>
      <PgBar host setItem={setItem} />
      <div className="flex lg:flex-row flex-col justify-between items-center pt-28 pb-10 w-full -mt-20">
        <div className="flex flex-col lg:items-start items-center lg:text-left text-center md:gap-10 gap-5 max-w-[678px] animate-slideInLeft">
          <h4 className="md:text-5xl text-3xl font-semibold md:leading-[72px] leading-10 text-btnGreen ">
            Affordable Mining Hosting with DAHAB miners
          </h4>
          <h4 className="text-base font-light text-white leading-6 tracking-wider">
            Need a top-notch hosting location for your ASIC miners?. DAHAB
            Miners provides the best and most affordable options in our modern
            hosting farms for your Bitcoin mining machine in UAE
          </h4>
          <motion.button
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1, backgroundColor: "#7decda" }} // Change color on hover
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }} // Smooth animation
            className="text-base font-semibold text-white bg-btnGreen px-5 py-3 w-fit rounded-lg"
            onClick={handleChatClick}
          >
            Get Started
          </motion.button>
          <div className="w-full">
            <CarouselNavigation setItem={setItem} item={item} />
          </div>
        </div>

        <div className="w-[550px] h-[310px] overflow-hidden md:w-[960px] md:h-[540px] z-10 animate-slideInRight">
          <img
            className=""
            src="/hostingcarouselimage.png"
            alt="Reliable-crypto-mining-services-in-abu-dhabi-UAE-support"
            title="Looking for reliable crypto mining solutions in UAE? Dahab Miners provides cutting-edge ASIC miners in Abu Dhabi, perfect for beginners and pros alike. Check out our CRYPTO MINING MACHINES IN UAE and start mining efficiently today!"
          ></img>
        </div>
        <img
          className="absolute right-0 top-0 hidden lg:block"
          src={svgbg}
          alt="Reliable-crypto-mining-services-in-abu-dhabi-UAE-support"
          title="Looking for reliable crypto mining solutions in UAE? Dahab Miners provides cutting-edge ASIC miners in Abu Dhabi, perfect for beginners and pros alike. Check out our CRYPTO MINING MACHINES IN UAE and start mining efficiently today!"
        ></img>
      </div>
    </>
  );
}

export default HostingCarousel;
