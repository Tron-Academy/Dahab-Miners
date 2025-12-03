import Notification from "../models/Notification.js";

//Get All unread Notification
export const getAllUnreadNotification = async (req, res) => {
  try {
    const notifications = await Notification.find({ isRead: false });
    res.status(200).json(notifications);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ msg: error.msg || error.message });
  }
};
