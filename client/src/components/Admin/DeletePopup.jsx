import { motion } from "framer-motion";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataId,
  setRefetchTrigger,
  setShowPopupFalse,
} from "../../slices/adminSlice";
import useDeleteData from "../../hooks/adminDatas/useDeleteData";
import Loading from "../Loading";

export default function DeletePopup() {
  const dispatch = useDispatch();
  const { dataId } = useSelector((state) => state.admin);
  const { loading, deleteData } = useDeleteData();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => {
        dispatch(setShowPopupFalse());
        dispatch(setDataId(""));
      }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="xl:w-1/3 md:w-1/2 sm:w-3/4 w-11/12 mx-auto rounded-lg flex flex-col gap-5 items-center bg-white border border-[#A5A5A5] py-5"
      >
        <p className="text-xl font-semibold">
          Are you sure you want to delete?
        </p>
        <div className="flex justify-center items-center gap-7 w-full">
          <button
            onClick={() => {
              dispatch(setShowPopupFalse());
              dispatch(setDataId(""));
            }}
            className="px-4 py-2 rounded-lg bg-[#FCFCFC] border border-[#8F8F8F]"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              await deleteData({ id: dataId });
              dispatch(setDataId(""));
              dispatch(setShowPopupFalse());
              dispatch(setRefetchTrigger());
            }}
            className="px-4 py-2 rounded-lg bg-[#DB1215] border border-[#8F8F8F] text-white"
          >
            Delete
          </button>
          {loading && <Loading />}
        </div>
      </motion.div>
    </motion.div>
  );
}
