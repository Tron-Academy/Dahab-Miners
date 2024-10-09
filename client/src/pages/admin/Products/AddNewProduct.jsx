import React, { useEffect } from "react";
import ProductImageUpload from "../../../components/Admin/Products/ProductImageUpload";
import { Link } from "react-router-dom";
import FormInput from "../../../components/FormInput";
import FormSelect from "../../../components/FormSelect";
import { cryptoCurrency, manufacturer } from "../../../utils/dropdowns";
import { GoDotFill } from "react-icons/go";
import { useState } from "react";
import useUploadFeaturedImage from "../../../hooks/adminProducts/useUploadFeaturedImage";
import useUploadProductImage from "../../../hooks/adminProducts/useUploadProductImage";
import useAddProduct from "../../../hooks/adminProducts/useAddProduct";
import Loading from "../../../components/Loading";

export default function AddNewProduct() {
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productImagePublicId, setProductImagePublicId] = useState("");
  const [manufacturerItem, setManufacturerItem] = useState("");
  const [cryptoCurrencyItem, setCryptoCurrencyItem] = useState([]);
  const [hashRate, setHashRate] = useState(0);
  const [power, setPower] = useState(0);
  const [algorithm, setAlgorithm] = useState("");
  const [price, setPrice] = useState(0);
  const [featuredImage, setFeaturedImage] = useState("");
  const [featuredImagePublicId, setFeaturedImagePublicId] = useState("");
  const [description, setDescription] = useState("");

  const {
    loading: featuredLoading,
    details: featuredDetails,
    uploadFeaturedImage,
  } = useUploadFeaturedImage();

  const {
    loading: productLoading,
    details: productImageDetails,
    uploadProductImage,
  } = useUploadProductImage();

  const { loading, addProduct } = useAddProduct();

  const handleCryptoChange = (e) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setCryptoCurrencyItem((prevSelected) => {
      const currentSelections = [...prevSelected];

      // Loop through the selectedValues and add/remove as necessary
      selectedValues.forEach((value) => {
        if (!currentSelections.includes(value)) {
          currentSelections.push(value); // Add new selections
        } else {
          // Remove the value if it was deselected
          currentSelections.splice(currentSelections.indexOf(value), 1);
        }
      });

      return currentSelections;
    });
  };

  const handleProductImage = async (e) => {
    await uploadProductImage(e);
  };

  const handleFeaturedImage = async (e) => {
    await uploadFeaturedImage(e);
  };

  useEffect(() => {
    if (productImageDetails) {
      setProductImage(productImageDetails.productImage);
      setProductImagePublicId(productImageDetails.productImagePublicId);
    }
  }, [productImageDetails, productLoading]);
  useEffect(() => {
    if (featuredDetails) {
      setFeaturedImage(featuredDetails.featuredImage);
      setFeaturedImagePublicId(featuredDetails.featuredImagePublicId);
    }
  }, [featuredDetails, featuredLoading]);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Create Product</h1>
        <Link
          to={"/admin/products"}
          className="bg-homeBg p-2 rounded-lg text-white hover:bg-blue-500 nav-link"
        >
          Go Back
        </Link>
      </div>
      <div className="my-10">
        <FormInput
          title={"Name"}
          type={"text"}
          placeholder={"Enter Name"}
          value={productName}
          onchange={(e) => setProductName(e.target.value)}
        />
        <div className="flex gap-2 items-end">
          <ProductImageUpload
            title={"Product Image"}
            changeFunction={(e) => handleProductImage(e)}
          />
          {productLoading && <Loading />}
          {productImage && (
            <div className="w-20 h-20 pb-5 rounded-lg overflow-hidden">
              <img src={productImage} className="object-contain"></img>
            </div>
          )}
        </div>
        <FormSelect
          title={"Manufacturer"}
          list={manufacturer}
          value={manufacturerItem}
          onchange={(e) => setManufacturerItem(e.target.value)}
        />
        <FormSelect
          title={"Cryptocurrency"}
          list={cryptoCurrency}
          multi
          value={cryptoCurrencyItem}
          onchange={handleCryptoChange}
        />
        <h3 className="mb-2">Selected Cryptocurrencies:</h3>
        <ul>
          {cryptoCurrencyItem.map((crypto, index) => (
            <li key={index} className="flex gap-2 items-center">
              <span>
                <GoDotFill />
              </span>
              {crypto}
            </li>
          ))}
        </ul>
        <FormInput
          title={"HashRate (Th/s)"}
          type={"Number"}
          placeholder={"Enter hashrate in Th/s"}
          value={hashRate}
          onchange={(e) => setHashRate(e.target.value)}
        />
        <FormInput
          title={"Power (Watts)"}
          type={"Number"}
          placeholder={"Enter power in Watts"}
          value={power}
          onchange={(e) => setPower(e.target.value)}
        />
        <FormInput
          title={"Algorithm"}
          type={"text"}
          placeholder={"Enter the algorithm of your Miner"}
          value={algorithm}
          onchange={(e) => setAlgorithm(e.target.value)}
        />
        <FormInput
          title={"Price (AED)"}
          type={"Number"}
          placeholder={"Enter price of product"}
          value={price}
          onchange={(e) => setPrice(e.target.value)}
        />
        <div className="flex gap-2 items-end">
          <ProductImageUpload
            title={"Featured Image"}
            changeFunction={(e) => handleFeaturedImage(e)}
          />
          {featuredLoading && <Loading />}
          {featuredImage && (
            <img
              src={featuredImage}
              className="w-20 h-20 pb-5 rounded-lg overflow-hidden"
            ></img>
          )}
        </div>

        <div className="form-row">
          <label className="form-label">Description</label>
          <div className="flex items-center">
            <textarea
              rows={3}
              className="w-full py-1 px-3 rounded-lg bg-purple-50 border border-gray-300 text-gray-900"
              placeholder="Enter your description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
        </div>
        <button
          onClick={() =>
            addProduct({
              productImage,
              productName,
              productImagePublicId,
              manufacturerItem,
              cryptoCurrencyItem,
              hashRate,
              power,
              algorithm,
              price,
              featuredImage,
              featuredImagePublicId,
              description,
            })
          }
          className="bg-homeBg p-2 rounded-lg text-white hover:bg-blue-500 nav-link"
        >
          Save Product
        </button>
        {loading && <Loading />}
      </div>
    </div>
  );
}
