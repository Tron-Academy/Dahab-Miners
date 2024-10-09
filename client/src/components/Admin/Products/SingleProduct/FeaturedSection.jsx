import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import useMakeFeatured from "../../../../hooks/adminProducts/useMakeFeatured";
import Loading from "../../../Loading";
import useRemoveFeatured from "../../../../hooks/adminProducts/useRemoveFeatured";

export default function FeaturedSection({
  img,
  name,
  isFeatured,
  id,
  refetch,
}) {
  const { loading, makeFeatured } = useMakeFeatured();
  const { loading: removeLoading, removeFeatured } = useRemoveFeatured();

  const featured = async () => {
    await makeFeatured(id);
    await refetch();
  };

  const unFeatured = async () => {
    await removeFeatured(id);
    await refetch();
  };

  return (
    <div className="p-5">
      <div className="flex justify-between my-5 items-center">
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl">Featured Image</h1>
          {isFeatured && (
            <p className="text-xl text-green-500">
              <MdVerified />
            </p>
          )}
        </div>
        {!isFeatured && (
          <>
            <button
              className="bg-homeBg p-2 text-white rounded-lg hover:bg-blue-500"
              onClick={featured}
              disabled={loading}
            >
              Make featured
            </button>
            {loading && <Loading />}
          </>
        )}
        {isFeatured && (
          <>
            <button
              className="bg-red-500 p-2 text-white rounded-lg hover:bg-red-400"
              onClick={unFeatured}
              disabled={removeLoading}
            >
              Remove Featured
            </button>
            {removeLoading && <Loading />}
          </>
        )}
      </div>
      <img className="w-56 h-56 rounded-lg" src={img} alt={name}></img>
    </div>
  );
}
