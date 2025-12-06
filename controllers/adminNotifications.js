import { NotFoundError } from "../errors/customErrors.js";
import Notification from "../models/Notification.js";

//Get All unread Notification
export const getAllUnreadNotification = async (req, res) => {
  try {
    const notifications = await Notification.find({ isRead: false }).sort({
      createdAt: -1,
    });
    res.status(200).json(notifications);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ msg: error.msg || error.message });
  }
};

//Get All Notifications
export const getAllNotifications = async (req, res) => {
  try {
    const { currentPage, status } = req.query;
    const page = Number(currentPage) || 1;
    const limit = 30;
    const skip = (page - 1) * limit;
    const queryObject = {};
    if (status && status !== "ALL") {
      queryObject.isRead = status === "read" ? true : false;
    }
    const notifications = await Notification.find(queryObject)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalNotifications = await Notification.countDocuments(queryObject);
    const totalPages = Math.ceil(totalNotifications / limit);
    res.status(200).json({ notifications, totalNotifications, totalPages });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ msg: error.msg || error.message });
  }
};

//mark notification as read
export const markNotificationRead = async (req, res) => {
  try {
    const { id } = req.body;
    const notification = await Notification.findByIdAndUpdate(
      id,
      {
        isRead: true,
      },
      { new: true }
    );
    if (!notification) throw new NotFoundError("No notification found");
    res.status(200).json({ msg: "success" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ msg: error.msg || error.message });
  }
};
