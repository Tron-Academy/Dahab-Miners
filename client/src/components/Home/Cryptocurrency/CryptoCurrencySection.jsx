import React from "react";
import crypto from "../../../assets/crypto.svg";
import bg from "../../../assets/cryptobg.svg";
import { handleChatClick } from "../../../utils/whatsapp";
import { Link } from "react-router-dom";
export default function CryptoCurrencySection() {
  return (
    <div
      className="bg-homeBg bg-blend-color-dodge px-5 md:px-10 lg:px-[120px] py-10 flex lg:flex-row flex-col justify-between items-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="max-w-[610px] flex flex-col lg:items-start items-center lg:text-left text-center gap-10">
        <p className="text-base font-semibold text-homeBgGradient">
          Unlock the potential of crypto
        </p>
        <div>
          <h4 className="text-5xl pb-3 font-semibold gradient-heading">
            Explore the future of cryptocurrency
          </h4>
          <h3 className="text-base font-semibold text-homeBgGradient">
            <a href="https://dahabminers.com/">Crypto Mining in UAE</a>
          </h3>
        </div>
        <p className="text-lg font-medium text-white leading-7">
          Discover Bitcoin, Ethereum, and Kaspa with our top-tier selection.
          Invest, trade or mine securely and innovatively. Start your journey
          with us and shape the future of finance today.
        </p>
        <Link
          to={"/buy"}
          className="px-4 py-2 mb-4 bg-btnGreen text-white text-base font-semibold rounded-lg w-fit hover:bg-btnHover nav-link"
        >
          View Products
        </Link>
      </div>
      <div>
        <div className="max-w-[590px] max-h-[645px] overflow-hidden">
          <img
            src={crypto}
            alt="Explore-the-potential-of-crypto-mining-in-abu-dhabi-UAE"
            title="Dahab Miners is the premier crypto mining service in UAE Explore our Bitcoin machines in Abu Dhabi and maximize your cryptocurrency earnings!"
          ></img>
        </div>
      </div>
    </div>
  );
}
