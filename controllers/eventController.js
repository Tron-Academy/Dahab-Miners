import { formatImage } from "../middleware/multerMiddleware.js";
import { v2 as cloudinary } from "cloudinary";
import Event from "../models/Events.js";
import { NotFoundError } from "../errors/customErrors.js";
import { cleanupCloudinaryImages } from "../utils/cloudinaryFunctions.js";

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
    await cleanupCloudinaryImages(uploadedPublicIds);
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

export const getSingleEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) throw new NotFoundError("No event found");
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ msg: error.msg || error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { publicId, eventId, imageType } = req.body;
    const event = await Event.findById(eventId);
    if (!event) throw new NotFoundError("No event found");
    if (imageType === "main") {
      await cloudinary.uploader.destroy(publicId);
      event.mainImage = null;
      await event.save();
      return res.status(200).json({ msg: "Image deleted successfully" });
    } else if (imageType === "small") {
      await cloudinary.uploader.destroy(publicId);
      event.smallImage = null;
      await event.save();
      return res.status(200).json({ msg: "Image deleted successfully" });
    } else if (imageType === "extra") {
      await cloudinary.uploader.destroy(publicId);
      event.extraImage = null;
      await event.save();
      return res.status(200).json({ msg: "Image deleted successfully" });
    } else if (imageType === "carousel") {
      await cloudinary.uploader.destroy(publicId);
      event.carouselImages = event.carouselImages.filter(
        (item) => item.publicId !== publicId
      );
      await event.save();
      return res.status(200).json({ msg: "Image deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.msg || error.message });
  }
};

export const editEvent = async (req, res) => {
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
    const event = await Event.findById(req.params.id);
    if (!event) throw new NotFoundError("No event found");
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
      smallImage: event.smallImage || null,
      mainImage: event.mainImage || null,
      extraImage: event.extraImage || null,
      carouselImages: event.carouselImages || [],
    };
    if (req.files?.mainImage?.[0]) {
      if (data.mainImage?.publicId) {
        await cloudinary.uploader.destroy(data.mainImage.publicId);
      }
      data.mainImage = await uploadSingle(req.files.mainImage[0]);
    }
    if (req.files?.smallImage?.[0]) {
      if (data.smallImage?.publicId) {
        await cloudinary.uploader.destroy(data.smallImage.publicId);
      }
      data.smallImage = await uploadSingle(req.files.smallImage[0]);
    }
    if (req.files?.extraImage?.[0]) {
      if (data.extraImage?.publicId) {
        await cloudinary.uploader.destroy(data.extraImage.publicId);
      }
      data.extraImage = await uploadSingle(req.files.extraImage[0]);
    }
    if (req.files?.carouselImages?.length > 0) {
      const newImages = await Promise.all(
        req.files.carouselImages.map((file) => uploadSingle(file))
      );
      data.carouselImages = [...data.carouselImages, ...newImages];
    }
    event.title = title;
    event.date = new Date(date);
    event.location = location;
    event.mainContent = mainContent;
    event.bottomContent = bottomContent || "";
    event.slug = slug;
    event.metaTitle = metaTitle;
    event.metaDescription = metaDescription;
    event.metaKeywords = metaKeywords;
    event.altText = altText;
    event.hostedBy = hostedBy || "";
    event.mainImage = data.mainImage;
    event.smallImage = data.smallImage;
    event.extraImage = data.extraImage;
    event.carouselImages = data.carouselImages;
    await event.save();
    res.status(200).json({ msg: "Updated successfully" });
  } catch (error) {
    await cleanupCloudinaryImages(uploadedPublicIds);
    res.status(500).json({ msg: error.msg || error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) throw new NotFoundError("No event found");
    if (event.mainImage?.publicId) {
      await cloudinary.uploader.destroy(event.mainImage.publicId);
    }
    if (event.smallImage?.publicId) {
      await cloudinary.uploader.destroy(event.smallImage.publicId);
    }
    if (event.extraImage?.publicId) {
      await cloudinary.uploader.destroy(event.extraImage.publicId);
    }
    if (event.carouselImages?.length > 0) {
      await Promise.all(
        event.carouselImages.map((item) =>
          cloudinary.uploader.destroy(item.publicId)
        )
      );
    }
    await event.deleteOne();
    res.status(200).json({ msg: "event deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.msg || error.message });
  }
};
