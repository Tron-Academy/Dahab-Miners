import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

export default function FarmLocationCard({
  image,
  power,
  location,
  hostingInfo,
  path,
  generalInfo,
}) {
  return (
    <motion.div
      initial={{
        borderImageSource:
          "linear-gradient(to bottom right, #004DF480 0%, transparent 50%, transparent 50%, #0194FE80 100%)",
        borderWidth: "2px",
        borderImageSlice: 1,
        borderRadius: "12px",
        scale: 1,
      }}
      whileHover={{
        borderImageSource:
          "linear-gradient(to bottom right, #004DF480 0%, #A5E7F380 50%, #0194FE80 100%)",
        borderWidth: "2px",
        boxShadow: "0px 0px 20px rgba(1, 148, 254, 0.6)",
        transition: { duration: 0.6, ease: "easeOut" },
      }}
      style={{
        borderStyle: "solid",
      }}
      className="text-white p-5 border rounded-lg flex flex-col gap-5 bg-[#000618]"
    >
      <div className="flex flex-col gap-3">
        <img
          src={image}
          className="w-[300px] h-[200px] rounded-lg object-cover"
        />
        <div className="flex gap-2 items-center">
          <button className="px-4 py-2 bg-[#0194FE] rounded-lg">{power}</button>
          <button className="px-4 py-2 bg-[#07EAD3] text-black rounded-lg">
            Hosting Available
          </button>
        </div>
        <h5 className="text-[#07EAD3] text-2xl">{location}</h5>
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-[#CCF2FF] text-xl">Hosting Information</p>
          <ul className="ml-10">
            {hostingInfo?.map((x, index) => (
              <li key={index}>{x}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[#CCF2FF] text-xl">General Information</p>
          <ul className="ml-10">
            {generalInfo?.map((x, index) => (
              <li key={index}>{x}</li>
            ))}
          </ul>
        </div>
      </div>
      <Link to={path} className="p-2 rounded-full btn-bg text-center">
        Know More Details
      </Link>
    </motion.div>
  );
}
