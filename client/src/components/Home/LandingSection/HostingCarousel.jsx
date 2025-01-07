import React from "react";
import CarouselNavigation from "./CarouselNavigation";
import { handleChatClick } from "../../../utils/whatsapp";
import { motion } from "framer-motion";
function HostingCarousel({ setItem, item }) {
  return (
    <>
      <section className="flex lg:flex-row flex-col justify-between items-center pt-28 pb-10 w-full -mt-20">
        <div className="flex flex-col lg:items-start items-center lg:text-left text-center md:gap-10 gap-5 max-w-[678px] animate-slideInLeft">
          <div>
            <div className="flex gap-5 items-center">
              <img src="/home/thunder.png" className="w-[20px]" />
              <div className="text-[#00C4F4] flex gap-3 items-center">
                <img src="/home/short-line.png" />
                <p>Host</p>
                <img src="/home/long-line.png" />
              </div>
            </div>
            <h4 className="md:text-5xl text-3xl font-semibold md:leading-[72px] leading-10 gradient-heading ">
              Affordable Mining{" "}
              <span className="relative gradient-heading">
                Hosting{" "}
                <img
                  className="absolute left-0 -bottom-2"
                  src="/home/underline.png"
                />
              </span>{" "}
              with DAHAB miners
            </h4>
          </div>
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
            className="text-base font-semibold text-white btn-bg px-5 py-3 w-fit rounded-lg"
            onClick={handleChatClick}
          >
            Get Started
          </motion.button>
          <CarouselNavigation setItem={setItem} item={item} />
        </div>

        <div className="w-[550px] h-[310px] overflow-hidden md:w-[960px] md:h-[540px] z-10 animate-slideInRight">
          <img
            className=""
            src="/hostingcarouselimage.png"
            alt="Reliable-crypto-mining-services-in-abu-dhabi-UAE-support"
            title="Looking for reliable crypto mining solutions in UAE? Dahab Miners provides cutting-edge ASIC miners in Abu Dhabi, perfect for beginners and pros alike. Check out our CRYPTO MINING MACHINES IN UAE and start mining efficiently today!"
          ></img>
        </div>
        <div className="absolute top-1/2 left-1/3 overflow-hidden">
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

export default HostingCarousel;
