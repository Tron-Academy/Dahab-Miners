import React from "react";
import { Link } from "react-router-dom";
import FeaturedCarousel from "./FeaturedCarousel";
import { motion } from "framer-motion";

export default function Miners() {
  const sectionVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  return (
    <section className="main-bg px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }} // Triggers when 20% of the section is visible
        variants={sectionVariants}
        className="text-center"
      >
        <p className="text-base font-semibold text-btnGreen py-5">Miners</p>
        <p className="text-[40px] font-semibold gradient-heading">
          Affordable Crypto Miners for Maximum Profits
        </p>
        <h2 className="mt-5 mb-7 max-w-[500px] mx-auto">
          <a href="https://dahabminers.com/">Buy Bitcoin Machines in Dubai.</a>{" "}
          Get powerful, reliable miners to grow your earnings. Start mining
          smarter today.
        </h2>
        <Link
          to={"/buy"}
          className="px-3 py-2 my-5 rounded-lg text-base text-white font-semibold border border-[#1ECBAF] nav-link hover:shadow-lg hover:shadow-[#1ECBAF]"
        >
          View all Products
        </Link>
      </motion.div>
      <FeaturedCarousel />
      <div className="flex justify-around">
        <div></div>
        {/* <div className="text-3xl flex gap-2">
          <div className="w-12 h-12 border flex items-center justify-center rounded-lg">
            <MdKeyboardArrowLeft />
          </div>
          <div className="w-12 h-12 border flex items-center justify-center rounded-lg">
            <MdKeyboardArrowRight />
          </div>
        </div> */}
      </div>
    </section>
  );
}
