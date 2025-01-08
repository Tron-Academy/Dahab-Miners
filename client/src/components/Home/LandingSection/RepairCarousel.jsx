import React from "react";
import CarouselNavigation from "./CarouselNavigation";
import { handleChatClick } from "../../../utils/whatsapp";
import { motion } from "framer-motion";
export default function RepairCarousel({ setItem, item }) {
  return (
    <>
      <section className="flex lg:flex-row flex-col justify-between items-center pt-28 pb-10 w-full -mt-20">
        <div className="flex flex-col lg:items-start items-center lg:text-left text-center md:gap-10 gap-5 max-w-[678px] animate-slideInLeft">
          <div>
            <div className="flex gap-5 items-center">
              <img src="/home/thunder.png" className="w-[20px]" />
              <div className="text-[#00C4F4] flex gap-3 items-center">
                <img src="/home/short-line.png" />
                <p>Repair</p>
                <img src="/home/long-line.png" />
              </div>
            </div>
            <h4 className="md:text-5xl text-3xl my-3 font-semibold md:leading-[60px] leading-10 gradient-heading">
              <a href="https://dahabminers.com/">
                ASIC Miner in Abu Dhabi, UAE
              </a>
            </h4>
            <h4 className="md:text-5xl text-3xl font-semibold text-btnGreen">
              <span className="relative gradient-heading">
                Repair{" "}
                <img className="absolute -bottom-2" src="/home/underline.png" />
              </span>{" "}
              Services
            </h4>
          </div>
          <h4 className="text-base font-light text-white leading-6 tracking-wider">
            Get your crypto mining gear back in action fast. Optimise your
            cryptocurrency mining machine operations with our rapid repair &
            maintenance service.
            <br></br>
            Ensure expert care for your equipment.
          </h4>
          <motion.button
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1, backgroundColor: "#7decda" }} // Change color on hover
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }} // Smooth animation
            className="text-base font-semibold text-white btn-bg px-5 py-3 w-fit rounded-lg"
            onClick={handleChatClick}
          >
            View Prices
          </motion.button>
          <CarouselNavigation setItem={setItem} item={item} />
        </div>

        <div className="w-[315px] h-[244px] md:w-[600px] md:h-[465px] relative animate-slideInRight mt-6 lg:mt-0">
          <img
            className="absolute z-10"
            src="/repaircarouselimage.png"
            alt="Essential-tools-for-crypto-mining-machines-in-abu-dhabi-UAE"
            title="Explore top-tier CRYPTO MINING MACHINES IN UAE at Dahab Miners. Specializing in high-efficiency ASIC miners in Abu Dhabi, UAE, we offer the best solutions for crypto mining in UAE. Browse our range today and enhance your mining setup!"
          ></img>
          <div className="absolute md:bottom-[15%] md:-left-[70%] -bottom-[20%] -left-[90%] overflow-hidden">
            <img
              src={"/home/homeline-1.png"}
              className="object-cover"
              alt="crypto-mining-machines-in-abu-dhabi-UAE-for-sale"
              title="Dahab Miners is your trusted partner for crypto mining in UAE, offering a diverse array of advanced ASIC miners in Abu Dhabi. Discover our premium CRYPTO MINING MACHINES IN UAE and optimize your mining operations with the best tools available."
            ></img>
          </div>
          <div className="absolute flex gap-2 md:-top-[10%] md:right-0 -right-[20%] overflow-hidden">
            <img
              src={"/home/homeline-2.png"}
              className="object-cover"
              alt="crypto-mining-machines-in-abu-dhabi-UAE-for-sale 2"
              title="Dahab Miners is your trusted partner 2 for crypto mining in UAE, offering a diverse array of advanced ASIC miners in Abu Dhabi. Discover our premium CRYPTO MINING MACHINES IN UAE and optimize your mining operations with the best tools available."
            ></img>
          </div>
          <div className="absolute glowing-box top-[15%] right-[25%] md:block hidden"></div>
        </div>
      </section>
    </>
  );
}
