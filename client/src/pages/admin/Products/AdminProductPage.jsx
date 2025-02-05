import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import ProductListItem from "../../../components/Admin/Products/ProductListItem";
import { Link } from "react-router-dom";
import useGetAllAdminProducts from "../../../hooks/adminProducts/useGetAllAdminProducts";
import Loading from "../../../components/Loading";

export default function AdminProductPage() {
  const [keyWord, setKeyWord] = useState("");
  const { loading, allProducts, refetch } = useGetAllAdminProducts({ keyWord });

  useEffect(() => {
    if (keyWord === "") {
      refetch();
    }
  }, [keyWord]);
  return (
    <div>
      <div className="flex justify-center md:justify-end">
        <Link
          to={"/admin/products/new"}
          className="flex gap-3 items-center bg-homeBg p-2 rounded-lg text-white hover:bg-blue-500 nav-link"
        >
          Add Product
          <span>
            <FaPlus />
          </span>
        </Link>
      </div>
      <h1 className="md:text-2xl text-lg my-2 text-black">All Products</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="my-10">
          <div className="flex flex-col">
            <div className="flex md:gap-2 gap-1 items-center mb-5">
              <input
                type="text"
                placeholder="search"
                value={keyWord}
                onChange={(e) => setKeyWord(e.target.value)}
                className="py-1 px-3 rounded-lg  border border-gray-300 text-gray-900 h-11"
              />
              <button
                className="py-3 px-3 bg-homeBg text-white rounded-full hover:bg-homeBgGradient nav-link"
                onClick={() => refetch()}
              >
                <FaSearch />
              </button>
            </div>

            <button
              className="p-2 bg-homeBg w-fit text-white rounded-lg hover:bg-homeBgGradient nav-link"
              onClick={() => {
                setKeyWord("");
              }}
            >
              Clear
            </button>
          </div>
          {allProducts.length > 0 &&
            allProducts.map((x) => (
              <ProductListItem
                key={x._id}
                img={x.productImage}
                name={x.productName}
                id={x._id}
              />
            ))}
          {allProducts.length === 0 && (
            <p className="text-lg">No products to show</p>
          )}
        </div>
      )}
    </div>
  );
}
