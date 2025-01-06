import React, { useState } from "react";
import TestimonialCard from "./TestimonialCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Michael Johnson",
    image: "/home/review-1.png",
    review:
      "The repair service at DAHAB Miners is outstanding. They quickly diagnosed and fixed my ASIC miner, minimizing downtime and getting me back to mining efficiently.",
  },
  {
    name: "Emily Chen",
    image: "/home/review-2.png",
    review:
      "Hosting my miners with DAHAB Miners has been a game-changer. Their facilities are secure and well-maintained, ensuring my equipment runs smoothly without any issues.",
  },
  {
    name: "David Miller",
    image: "/home/review-4.png",
    review:
      "I've been impressed with DAHAB Miner's commitment to quality and customer service. From purchasing ASIC miners to receiving support, they've exceeded my expectations.",
  },
  {
    name: "Sophia Lee",
    image: "/home/review-3.png",
    review:
      "DAHAB Miners provides excellent and cost-effective hosting solutions for mining equipment, allowing me to maximize my profitability.",
  },
];

export default function Testimonials() {
  const sectionVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of slides to show at a time
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="main-bg px-5 md:px-10 lg:px-[180px] py-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }} // Triggers when 20% of the section is visible
        variants={sectionVariants}
      >
        <h4 className="text-base font-light tracking-widest text-btnGreen text-center">
          TESTIMONIALS
        </h4>
        <h4 className="text-[40px] font-semibold gradient-heading text-center">
          What our clients say about us
        </h4>
      </motion.div>
      <Slider {...settings} className="my-10">
        {testimonials.map((x, index) => (
          <div key={index} className="px-2">
            <TestimonialCard name={x.name} content={x.review} image={x.image} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
