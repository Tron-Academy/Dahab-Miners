import mongoose, { model, Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    productName: {
      type: String,
    },
    productImage: {
      type: String,
    },
    productCategory: {
      type: String,
    },
    productImagePublicId: {
      type: String,
    },
    featuredImage: {
      type: String,
    },
    featuredImagePublicId: {
      type: String,
    },
    hashRate: {
      type: String,
    },
    power: {
      type: Number,
    },
    algorithm: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    manufacturer: {
      type: String,
    },
    cryptoCurrency: {
      type: [String],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeywords: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", ProductSchema);
export default Product;
