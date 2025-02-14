import React from "react";
import { handleChatClick } from "../../utils/whatsapp";

export default function BitcoinConsulting() {
  return (
    <section className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 flex flex-col items-center gap-5 ">
      <h5 className="gradient-heading text-[40px] font-semibold text-center">
        Expert Guidance for Your Mining Success
      </h5>
      <p className="text-white max-w-[450px] text-center">
        Get free consultation, expert purchasing advice, miner configuration
        assistance, and tailored investment strategies—all at no extra cost.
      </p>
      <div className=" p-10 customborder flex md:flex-row flex-col gap-7 items-center justify-between w-full">
        <div className="text-white flex flex-col items-start gap-5">
          <div className="flex gap-5 items-center">
            <img src="/host/icon-1.png" className="w-5" />
            <p>
              Purchasing advice -{" "}
              <span className="font-extralight">
                Choose the best miner for your needs
              </span>
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <img src="/host/icon-2.png" className="w-5" />
            <p>
              Free Miner Configuration -{" "}
              <span className="font-extralight">
                We help set up pools, worker IDs, and more.
              </span>
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <img src="/host/icon-3.png" className="w-5" />
            <p>
              Investment Strategy Planning -{" "}
              <span className="font-extralight">
                Get insights to maximize your mining profits
              </span>
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <img src="/host/icon-4.png" className="w-5" />
            <p>
              Hassle-Free Setup -{" "}
              <span className="font-extralight">
                From selection to deployment, we make it easy.
              </span>
            </p>
          </div>
          <button
            className="px-4 py-2 rounded-full btn-bg mx-auto md:mx-0"
            onClick={() => handleChatClick()}
          >
            Know More
          </button>
        </div>
        <img
          src="/5.jpg"
          className="md:max-w-[400px] max-w-[350px] rounded-lg overflow-hidden object-cover"
        />
      </div>
    </section>
  );
}
