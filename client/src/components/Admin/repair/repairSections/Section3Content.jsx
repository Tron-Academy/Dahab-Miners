import React, { useEffect, useState } from "react";
import FormInput from "../../../FormInput";
import ProductImageUpload from "../../Products/ProductImageUpload";
import useUploadLogImage from "../../../../hooks/adminRepair/useUploadLogImage";
import usePassTesting from "../../../../hooks/adminRepair/usePassTesting";
import Loading from "../../../Loading";
import { toast } from "react-toastify";

const options = ["To Be Tested", "Test Passed", "Test Failed"];

export default function Section3Content({ miner }) {
  const [testStatus, setTestStatus] = useState("To Be Tested");
  const [logImageUrl, setLogImageUrl] = useState("");
  const [logImagePublicId, setLogImagePublicId] = useState("");
  const [remarks, setRemarks] = useState("");

  const { loading, uploadImage, imageDetails } = useUploadLogImage();
  const { loading: passLoading, passTesting } = usePassTesting();

  function handleUpdate() {
    if (testStatus === "To Be Tested") {
      return;
    } else if (testStatus === "Test Passed") {
      passTesting({
        id: miner?._id,
        logImagePublicId,
        logImageUrl,
        remarks,
      });
    } else {
      toast.warn("Test Failed");
    }
  }

  useEffect(() => {
    if (miner && miner.testStatus) {
      setTestStatus(miner.testStatus);
    }
    if (miner && miner.successImgUrl) {
      setLogImageUrl(miner.successImgUrl);
    }
    if (miner && miner.remarks) {
      setRemarks(miner.remarks[miner.remarks.length - 1]);
    }
  }, [miner]);

  useEffect(() => {
    if (imageDetails) {
      setLogImageUrl(imageDetails.url);
      setLogImagePublicId(imageDetails.publicId);
    }
  }, [loading, imageDetails]);
  return (
    <div className="p-5 bg-white rounded-md">
      <h2 className="text-2xl mb-5 font-semibold">Testing Process</h2>
      <div className="flex flex-col gap-2 bg-gray-200 p-5 rounded-lg my-5">
        <label className="text-sm">Repair Status</label>
        <select
          value={testStatus}
          onChange={(e) => setTestStatus(e.target.value)}
          className="py-1 px-3 rounded-lg bg-transparent border border-[#0B578E] outline-none  text-black"
        >
          {options.map((item, index) => (
            <option
              key={index}
              className="border-b py-1 border-gray-300 bg-[#CCF2FF] text-black"
            >
              {item}
            </option>
          ))}
        </select>
        <div className="flex gap-3 items-center">
          <ProductImageUpload
            title={"Add Log"}
            changeFunction={(e) => uploadImage({ e })}
          />
          {logImageUrl !== "" &&
            (loading ? (
              <Loading />
            ) : (
              <img src={logImageUrl} className="w-40 object-cover" />
            ))}
        </div>

        <FormInput
          type={"text"}
          title={"Remarks"}
          admin
          value={remarks}
          onchange={(e) => setRemarks(e.target.value)}
        />
        <button
          className="px-4 py-2 rounded-md bg-homeBg hover:bg-homeBgGradient text-white disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={loading}
          onClick={handleUpdate}
        >
          Update
        </button>
        {passLoading && <Loading />}
      </div>
    </div>
  );
}
