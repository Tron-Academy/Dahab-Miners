import mongoose from "mongoose";
import MiningNotification from "../../models/miningApp/MiningNotification.js";
import MiningUser from "../../models/miningApp/MiningUser.js";
import { NotFoundError } from "../../errors/customErrors.js";

export const addNotification = async (req, res) => {
  const { message } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const newNotification = new MiningNotification({
      content: message,
    });
    await newNotification.save({ session });
    const result = await MiningUser.updateMany(
      {},
      { $push: { notifications: newNotification._id } },
      { session }
    );
    if (result.matchedCount === 0) {
      throw new NotFoundError("No users found");
    }
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ msg: "successfully added notification" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ msg: error.message });
  }
};

export const getAllNotifications = async (req, res) => {
  const allNotifications = await MiningNotification.find();
  if (!allNotifications.length)
    throw new NotFoundError("No notifications found");
  res.status(200).json(allNotifications);
};

export const clearUserNotifications = async (req, res) => {
  const user = await MiningUser.findById(req.user.userId);
  if (!user) throw new NotFoundError("No user has been found");
  user.notifications = [];
  await user.save();
  res.status(200).json({ msg: "successfully cleared notifications" });
};

export const getUserNotifications = async (req, res) => {
  const user = await MiningUser.findById(req.user.userId).populate(
    "notifications"
  );
  if (!user) throw new NotFoundError("No user has been found");
  res.status(200).json({ notifications: user.notifications || [] });
};
