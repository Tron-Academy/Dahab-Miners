import React from "react";

function DeletePrompt({ function1, function2 }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full opacity-80 bg-black flex justify-center items-center z-50">
      <div className="bg-[#fff] px-5 p-3 rounded-lg flex flex-col gap-5 justify-center items-stretch max-w-96 h-48 opacity-100">
        <h1 className="leading-6 font-semibold">
          Are you sure want to delete?.
        </h1>
        <div className="flex gap-5 justify-center">
          <button
            onClick={function1}
            className="p-2 px-4 bg-gray-500 rounded-lg hover:bg-gray-400"
          >
            No
          </button>
          <button
            onClick={function2}
            className="p-2 px-4 bg-red-500 rounded-lg hover:bg-red-400"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePrompt;
