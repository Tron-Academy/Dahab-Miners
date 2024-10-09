import React from "react";
import ProductCard from "../buyMiners/ProductCard";
import { Link } from "react-router-dom";
import useGetFeaturedProducts from "../../hooks/userProducts/useGetFeaturedProducts";
import Loading from "../Loading";

export default function BuyBox() {
  const { loading, products } = useGetFeaturedProducts();
  return (
    <div className="px-5 md:px-10 xl:px-[120px] py-10">
      <h1 className="text-2xl lg:text-4xl font-semibold text-center">
        Buy and Host Mining
      </h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-10 ">
          {products?.length > 0 &&
            products
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

      <div className="flex justify-center">
        <Link
          to={"/buy"}
          className="text-base font-medium border rounded-lg px-4 py-2 hover:bg-gray-200 nav-link"
        >
          View More Products
        </Link>
      </div>
    </div>
  );
}
