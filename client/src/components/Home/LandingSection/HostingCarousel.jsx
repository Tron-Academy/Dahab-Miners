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
              <img
                src="/home/thunder.png"
                alt="Bitcoin Mining in Dubai"
                className="w-[20px]"
              />
              <div className="text-[#00C4F4] flex gap-3 items-center">
                <img src="/home/short-line.png" alt="Bitcoin Mining in Dubai" />
                <p>Host</p>
                <img src="/home/long-line.png" alt="Bitcoin Mining in Dubai" />
              </div>
            </div>
            <h4 className="md:text-5xl text-3xl font-semibold md:leading-[72px] leading-10 gradient-heading z-[10]">
              Host Your Crypto Miners with{" "}
              <span className="relative gradient-heading">
                Confidence{" "}
                <img
                  className="absolute left-0 -bottom-2"
                  src="/home/underline.png"
                  alt="Bitcoin Mining in Dubai"
                />
              </span>{" "}
              – Only at DAHAB Miners
            </h4>
          </div>
          <h4 className="text-base font-light text-white leading-6 tracking-wider">
            Maximize your mining efficiency with our state-of-the-art, secure,
            and affordable hosting facilities in UAE and Ethiopia. Join the
            leaders in crypto mining hosting and secure your spot today
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

        <div className="w-[550px] h-[310px]  md:w-[960px] md:h-[540px] relative animate-slideInRight z-[5]">
          <img
            className="absolute z-10 translate-y-10 object-cover"
            src="/hostingcarouselimage.png"
            alt="Reliable-crypto-mining-services-in-abu-dhabi-UAE-support"
            title="Looking for reliable crypto mining solutions in UAE? Dahab Miners provides cutting-edge ASIC miners in Abu Dhabi, perfect for beginners and pros alike. Check out our CRYPTO MINING MACHINES IN UAE and start mining efficiently today!"
          ></img>
          <div className="absolute md:-left-[35%] md:top-[20%] -bottom-[20%] -left-[30%] overflow-hidden">
            <img
              src={"/home/homeline-1.png"}
              className="object-cover"
              alt="crypto-mining-machines-in-abu-dhabi-UAE-for-sale"
              title="Dahab Miners is your trusted partner for crypto mining in UAE, offering a diverse array of advanced ASIC miners in Abu Dhabi. Discover our premium CRYPTO MINING MACHINES IN UAE and optimize your mining operations with the best tools available."
            ></img>
          </div>
          <div className="absolute flex gap-2 md:-top-[1%] md:-right-[20%] -top-[3%] right-[15%]  overflow-hidden">
            <img
              src={"/home/homeline-2.png"}
              className="object-cover"
              alt="crypto-mining-machines-in-abu-dhabi-UAE-for-sale 2"
              title="Dahab Miners is your trusted partner 2 for crypto mining in UAE, offering a diverse array of advanced ASIC miners in Abu Dhabi. Discover our premium CRYPTO MINING MACHINES IN UAE and optimize your mining operations with the best tools available."
            ></img>
          </div>
          <div className="absolute right-0 top-[15%] glowing-box hidden md:block"></div>
        </div>
      </section>
    </>
  );
}

export default HostingCarousel;
