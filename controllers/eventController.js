import { formatImage } from "../middleware/multerMiddleware.js";
import { v2 as cloudinary } from "cloudinary";
import Event from "../models/Events.js";

export const addNewEvent = async (req, res) => {
  let uploadedPublicIds = [];
  try {
    const {
      title,
      date,
      mainContent,
      bottomContent,
      location,
      slug,
      altText,
      hostedBy,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = req.body;
    const uploadSingle = async (file) => {
      const formatted = formatImage(file);
      const res = await cloudinary.uploader.upload(formatted);
      uploadedPublicIds.push(res.public_id);
      return {
        url: res.secure_url,
        publicId: res.public_id,
      };
    };
    const data = {
      smallImage: null,
      mainImage: null,
      extraImage: null,
      carouselImages: [],
    };
    if (req.files?.mainImage?.[0]) {
      data.mainImage = await uploadSingle(req.files.mainImage[0]);
    }
    if (req.files?.smallImage?.[0]) {
      data.smallImage = await uploadSingle(req.files.smallImage[0]);
    }
    if (req.files?.extraImage?.[0]) {
      data.extraImage = await uploadSingle(req.files.extraImage[0]);
    }
    if (req.files?.carouselImages?.length > 0) {
      data.carouselImages = await Promise.all(
        req.files.carouselImages.map((file) => uploadSingle(file))
      );
    }
    const newEvent = new Event({
      title: title,
      date: new Date(date),
      location: location,
      mainContent: mainContent,
      bottomContent: bottomContent || "",
      slug: slug,
      metaTitle: metaTitle,
      metaDescription: metaDescription,
      metaKeywords: metaKeywords,
      altText: altText,
      hostedBy: hostedBy || "",
      mainImage: data.mainImage,
      smallImage: data.smallImage,
      extraImage: data.extraImage,
      carouselImages: data.carouselImages,
    });
    await newEvent.save();
    res.status(200).json({ message: "Event added", newEvent });
  } catch (error) {
    res.status(500).json({ msg: error.msg || error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ msg: error.msg || error.message });
  }
};
