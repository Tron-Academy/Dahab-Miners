import { model, Schema } from "mongoose";

const ImageSchema = new Schema(
  {
    url: {
      type: String,
    },
    publicId: {
      type: String,
    },
  },
  { _id: false }
);

const EventSchema = new Schema(
  {
    title: {
      type: String,
    },
    date: {
      type: Date,
    },
    mainContent: {
      type: String,
    },
    bottomContent: {
      type: String,
    },
    location: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
    smallImage: {
      type: ImageSchema,
    },
    altText: {
      type: String,
    },
    mainImage: {
      type: ImageSchema,
    },
    hostedBy: {
      type: String,
    },
    extraImage: {
      type: ImageSchema,
    },
    carouselImages: {
      type: [ImageSchema],
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
  { timestamps: true }
);

const Event = model("Event", EventSchema);
export default Event;
