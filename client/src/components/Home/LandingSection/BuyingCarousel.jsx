import React from "react";
import svgbg from "../../../assets/homebg.svg";
import ProgressBar from "./ProgressBar";
import PgBar from "./PbBar";
import CarouselNavigation from "./CarouselNavigation";
import { handleChatClick } from "../../../utils/whatsapp";

export default function BuyingCarousel({ setItem, item }) {
  return (
    <>
      <PgBar setItem={setItem} />
      <div className="flex lg:flex-row flex-col justify-between items-center pt-28 pb-10 overflow-hidden">
        <div className="flex flex-col lg:items-start items-center lg:text-left text-center max-w-[750px] gap-10 animate-slideInLeft -mt-20 z-20">
          <h4 className="text-5xl leading-[60px] inline-block font-semibold text-btnGreen pt-5">
            Unleash unmatched power with our premium crypto mining equipment.
          </h4>
          <div>
            <h1 className="text-base font-light text-white leading-6 tracking-wider">
              <a href="https://dahabminers.ae/">Crypto Mining in UAE</a>
            </h1>
            <h4 className="text-base font-light text-white leading-6 tracking-wider">
              Buy a crypto mining machine today and step into the future of
              crypto mining.
            </h4>
            <h4 className="text-base font-light text-white leading-6 tracking-wider">
              With expert support, your success is just a step away. Shop now
            </h4>
          </div>

          <button
            className="text-base font-semibold text-white bg-btnGreen hover:bg-btnHover nav-link px-5 py-3 w-fit rounded-lg z-10"
            onClick={handleChatClick}
          >
            View Products
          </button>
          <div className="w-full ">
            <CarouselNavigation setItem={setItem} item={item} />
          </div>
        </div>

        <div className="w-full max-w-[300px] h-[250px] md:max-w-[550px] md:h-[450px] mx-auto z-10 animate-slideInRight mt-4 md:mt-7 lg:-mt-20">
          <img
            className="w-full h-full object-contain"
            src="/buycarousel.png"
            alt="crypto-mining-machines-in-abu-dhabi-UAE-for-sale"
            title="Dahab Miners is your trusted partner for crypto mining in UAE, offering a diverse array of advanced ASIC miners in Abu Dhabi. Discover our premium CRYPTO MINING MACHINES IN UAE and optimize your mining operations with the best tools available."
          />
        </div>

        <div className="absolute right-0 top-0 hidden lg:block overflow-hidden ">
          <img
            src={svgbg}
            alt="crypto-mining-machines-in-abu-dhabi-UAE-for-sale"
            title="Dahab Miners is your trusted partner for crypto mining in UAE, offering a diverse array of advanced ASIC miners in Abu Dhabi. Discover our premium CRYPTO MINING MACHINES IN UAE and optimize your mining operations with the best tools available."
          ></img>
        </div>
      </div>
    </>
  );
}
