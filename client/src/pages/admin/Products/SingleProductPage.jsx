import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductHeader from "../../../components/Admin/Products/SingleProduct/ProductHeader";
import ProductDetails from "../../../components/Admin/Products/SingleProduct/ProductDetails";
import DescriptionBox from "../../../components/Admin/Products/SingleProduct/DescriptionBox";
import FeaturedSection from "../../../components/Admin/Products/SingleProduct/FeaturedSection";
import useGetSingleAdminProduct from "../../../hooks/adminProducts/useGetSingleAdminProduct";
import Loading from "../../../components/Loading";
import CoinTypes from "../../../components/Admin/Products/SingleProduct/CoinTypes";
import DeletePrompt from "../../../components/Admin/Products/SingleProduct/DeletePrompt";
import useDeleteProduct from "../../../hooks/adminProducts/useDeleteProduct";

export default function SingleProductPage() {
  const { id } = useParams();
  const { loading, product, refetch } = useGetSingleAdminProduct({ id });
  const { deleteProduct } = useDeleteProduct();
  const [showDelete, setShowDelete] = useState(false);

  const function1 = async () => {
    setShowDelete(false);
  };
  const function2 = async () => {
    deleteProduct(id);
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="text-black">
      {showDelete && (
        <DeletePrompt function1={function1} function2={function2} />
      )}
      <ProductHeader
        img={product?.productImage}
        name={product?.productName}
        price={product?.price}
      />
      <ProductDetails
        hash={product?.hashRate}
        power={product?.power}
        algorithm={product?.algorithm}
      />
      <CoinTypes list={product?.cryptoCurrency} />
      <DescriptionBox desc={product?.description} />
      <FeaturedSection
        img={product?.featuredImage}
        name={product?.productName}
        isFeatured={product?.isFeatured}
        id={id}
        refetch={refetch}
      />
      <div className="p-5 flex gap-4 justify-end text-black">
        <Link
          to={`/admin/products/${product?._id}/edit`}
          className="p-2 px-5 bg-homeBg text-white rounded-lg hover:bg-blue-500 nav-link"
        >
          Edit
        </Link>
        <button
          className="p-2 px-5 bg-red-700 text-white rounded-lg hover:bg-red-500 nav-link"
          onClick={() => setShowDelete(true)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
