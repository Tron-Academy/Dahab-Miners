import React, { useState } from "react";
import { toast } from "react-toastify";
import { handleEmailEnquiry } from "../../../utils/whatsapp";

export default function DiscussSection() {
  const [query, setQuery] = useState("");
  function handleSend() {
    if (query === "") {
      toast.warn("Please Enter query");
    } else {
      handleEmailEnquiry({ email: query });
      setQuery("");
    }
  }
  return (
    <section className="px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 main-bg">
      <div className="flex md:flex-row flex-col justify-between gap-5 items-center customborder p-10">
        <div className="w-[350px] flex flex-col gap-5">
          <p className="text-[#0194FE] text-3xl font-semibold md:text-left text-center">
            Let’s Talk About Your Mining Goals
          </p>
          <p className="text-[#A1D3F8] md:block hidden">
            Have a question or need guidance? Share your query with us, and
            we’ll connect you directly on WhatsApp for a quick and personalized
            response.
          </p>
        </div>
        <div className="max-w-[400px] flex flex-col md:items-start items-center gap-5">
          <p className="text-[#A1D3F8] text-sm md:text-left text-center">
            Enter your query below, and let’s find the perfect solution for your
            mining journey
          </p>
          <div className="flex md:flex-row flex-col gap-3 relative">
            <input
              type="text"
              placeholder="Type your query here"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-5 py-2 rounded-full outline-none bg-transparent border border-[#0194FE] min-w-full"
            />
            <button
              className="btn-bg px-10 py-2 rounded-full md:block hidden absolute -right-[30%]"
              onClick={handleSend}
            >
              Send
            </button>
            <button
              className="btn-bg px-10 py-2 rounded-full md:hidden"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
