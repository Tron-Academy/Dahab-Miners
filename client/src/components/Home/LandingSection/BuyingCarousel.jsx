import React from "react";

import CarouselNavigation from "./CarouselNavigation";
import { handleChatClick } from "../../../utils/whatsapp";
import { motion } from "framer-motion";

export default function BuyingCarousel({ setItem, item }) {
  return (
    <>
      {/* <PgBar setItem={setItem} /> */}
      <section className="flex lg:flex-row flex-col justify-between items-center pt-28 pb-10 overflow-hidden">
        <div className="flex flex-col lg:items-start items-center lg:text-left text-center max-w-[650px] md:gap-10 gap-5 animate-slideInLeft -mt-20 z-20">
          <div>
            <div className="flex gap-5 items-center">
              <img src="/home/thunder.png" className="w-[20px]" />
              <div className="text-[#00C4F4] flex gap-3 items-center">
                <img src="/home/short-line.png" />
                <p>Buy</p>
                <img src="/home/long-line.png" />
              </div>
            </div>
            <h4 className="md:text-5xl text-3xl md:leading-[60px] leading-10 inline-block font-semibold gradient-heading pt-5">
              Unleash Unmatched Power With Our{" "}
              <span className="relative gradient-heading">
                Premium{" "}
                <img
                  className="absolute w-48 left-0 -bottom-1"
                  src="/home/underline.png"
                />
              </span>{" "}
              Crypto Mining Equipment.
            </h4>
          </div>
          <div>
            <h1 className="text-base font-light text-white leading-6 tracking-wider">
              <a href="https://dahabminers.com/">Crypto Mining in UAE</a>
            </h1>
            <h4 className="text-base font-light text-white leading-6 tracking-wider">
              Buy a crypto mining machine today and step into the future of
              crypto mining.
            </h4>
            <h4 className="text-base font-light text-white leading-6 tracking-wider">
              With expert support, your success is just a step away. Shop now
            </h4>
          </div>

          <motion.button
            initial={{ scale: 1 }}
            whileHover={{ scale: 0.9, backgroundColor: "#7decda" }} // Change color on hover
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }} // Smooth animation
            className="text-base font-semibold text-white bg-btnGreen px-5 py-3 w-fit rounded-lg z-10"
            onClick={handleChatClick}
          >
            View Products
          </motion.button>
          <CarouselNavigation setItem={setItem} item={item} />
          {/* <div className="w-full ">
            <CarouselNavigation setItem={setItem} item={item} />
          </div> */}
        </div>

        <div className="w-full max-w-[300px] h-[250px] md:max-w-[550px] md:h-[450px] mx-auto z-10 animate-slideInRight mt-4 md:mt-7 lg:-mt-20">
          <img
            className="w-full h-full object-contain"
            src="/buycarousel.webp"
            alt="crypto-mining-machines-in-abu-dhabi-UAE-for-sale"
            title="Dahab Miners is your trusted partner for crypto mining in UAE, offering a diverse array of advanced ASIC miners in Abu Dhabi. Discover our premium CRYPTO MINING MACHINES IN UAE and optimize your mining operations with the best tools available."
          />
        </div>

        <div className="absolute top-1/2 left-1/4 overflow-hidden">
          <img
            src={"/home/homeline-1.png"}
            className="object-cover"
            alt="crypto-mining-machines-in-abu-dhabi-UAE-for-sale"
            title="Dahab Miners is your trusted partner for crypto mining in UAE, offering a diverse array of advanced ASIC miners in Abu Dhabi. Discover our premium CRYPTO MINING MACHINES IN UAE and optimize your mining operations with the best tools available."
          ></img>
        </div>
        <div className="absolute flex gap-2 top-20 right-20 overflow-hidden">
          <img
            src={"/home/homeline-2.png"}
            className="object-cover"
            alt="crypto-mining-machines-in-abu-dhabi-UAE-for-sale 2"
            title="Dahab Miners is your trusted partner 2 for crypto mining in UAE, offering a diverse array of advanced ASIC miners in Abu Dhabi. Discover our premium CRYPTO MINING MACHINES IN UAE and optimize your mining operations with the best tools available."
          ></img>
        </div>
        <div className="absolute glowing-box top-[35%] right-[20%]"></div>
      </section>
    </>
  );
}
