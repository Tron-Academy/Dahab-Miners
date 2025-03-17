import React, { useState } from "react";
import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../slices/adminSlice";

export default function Pagination({ totalPage, setTotalPage }) {
  const { currentPage } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  function next() {
    dispatch(setCurrentPage(currentPage + 1));
  }
  function prev() {
    dispatch(setCurrentPage(currentPage - 1));
  }

  function addPageButton({ pageNumber, activeClass }) {
    return (
      <button
        onClick={() => dispatch(setCurrentPage(pageNumber))}
        className={`px-1 lg:px-3 border-l-2 hover:bg-[#6FC6B8] ${
          activeClass && "bg-[#6FC6B8]"
        }`}
        key={pageNumber}
      >
        {pageNumber}
      </button>
    );
  }

  const renderPageButtons = () => {
    const pageButtons = [];
    //1st page
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );
    //dots
    if (currentPage > 3) {
      pageButtons.push(
        <button className={`px-3 border-l-2 hover:bg-[#6FC6B8]  `}>...</button>
      );
    }
    //page before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage - 1, activeClass: false })
      );
    }
    //current page
    if (currentPage !== 1 && currentPage !== totalPage) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage, activeClass: true })
      );
    }
    //page after current page
    if (currentPage !== totalPage && currentPage !== totalPage - 1) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage + 1, activeClass: false })
      );
    }
    //dots
    if (currentPage < totalPage - 2) {
      pageButtons.push(
        <button className={`px-3 border-l-2 hover:bg-[#6FC6B8]  `}>...</button>
      );
    }
    //last page
    pageButtons.push(
      addPageButton({
        pageNumber: totalPage,
        activeClass: currentPage === totalPage,
      })
    );
    return pageButtons;
  };
  return (
    <div className="flex justify-center w-fit border-2 rounded-xl mb-5">
      <button
        className="flex items-center gap-2 font-semibold text-sm px-1 lg:px-5 py-3 hover:bg-[#6FC6B8] rounded-l-xl"
        disabled={currentPage === 1}
        onClick={prev}
      >
        <p className="text-lg">
          <GrFormPreviousLink />
        </p>
        <p>Previous</p>
      </button>
      <div className="flex">{renderPageButtons()}</div>
      <div className="w-[2px] bg-gray-200"></div>
      <button
        className="flex items-center gap-2 font-semibold text-sm px-1 lg:px-5 py-3 hover:bg-[#6FC6B8] rounded-r-xl"
        disabled={currentPage === totalPage}
        onClick={next}
      >
        <p>Next</p>
        <p className="text-lg">
          <GrFormNextLink />
        </p>
      </button>
    </div>
  );
}
