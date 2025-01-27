import React, { useEffect, useState } from "react";
import BestSellingProducts from "./BestSellingProducts";
import SearchAndFilter from "./SearchAndFilter";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import useGetAllProducts from "../../hooks/userProducts/useGetAllProducts";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import useGetFeaturedProducts from "../../hooks/userProducts/useGetFeaturedProducts";

export default function BuyMinersSection() {
  const { manufacturerOptions, cryptoCurrencyOption, keyWord, sortby } =
    useSelector((state) => state.userProductSearch);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const { loading: featuredLoading, products: featuredProducts } =
    useGetFeaturedProducts();
  console.log(featuredProducts);

  const { loading, refetch, products, pages } = useGetAllProducts({
    keyWord,
    cryptoCurrencyOption,
    manufacturerOptions,
    sortby,
    currentPage,
  });
  useEffect(() => {
    setTotalPage(pages);
  }, [products, loading, refetch]);

  useEffect(() => {
    refetch();
  }, [currentPage]);
  return (
    <div className="bg-[#000618] px-5 md:px-10 lg:px-[120px] xl:px-[180px] py-10 z-[1]">
      <div className="h-24 lg:h-40 flex justify-center items-center">
        <h1 className="buy-miners-heading text-2xl pb-5 lg:text-[40px] font-semibold">
          Shop Best Miners
        </h1>
      </div>
      <div className="flex lg:flex-row flex-col gap-2">
        <div className="">
          <SearchAndFilter refetch={refetch} />
        </div>
        {loading ? (
          <Loading />
        ) : (
          <BestSellingProducts products={products} refetch={refetch} />
        )}
      </div>
      {totalPage > 1 && (
        <div className="flex justify-center">
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPage={totalPage}
            setTotalPage={setTotalPage}
          />
        </div>
      )}

      <div className="">
        <h1 className="text-2xl lg:text-4xl font-semibold text-[#1ECBAF] text-center">
          Top Rated Products
        </h1>
        {featuredLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 my-10">
            {featuredProducts?.length > 0 &&
              featuredProducts
                .slice(0, 4)
                .map((x) => (
                  <ProductCard
                    key={x._id}
                    name={x.productName}
                    img={x.productImage}
                    price={x.price}
                  />
                ))}
          </div>
        )}
      </div>
    </div>
  );
}
