import mongoose from "mongoose";
import FarmAnnouncement from "../models/FarmAnnouncement.js";
import Data from "../models/DataModel.js";
import Notification from "../models/Notification.js";

export const startFarmDowntime = async () => {
  const now = new Date();
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const announcements = await FarmAnnouncement.find({
      status: "scheduled",
      startAt: { $lte: now },
    })
      .populate("farm")
      .session(session);
    for (const ann of announcements) {
      const farm = ann.farm;
      if (!farm) continue;
      if (farm.farmStatus !== "Offline") {
        farm.farmStatus = "Offline";
        farm.downTimeHistory.push({
          announcement: ann._id,
          startAt: ann.startAt,
        });
        await farm.save({ session });
      }
      await Data.updateMany(
        {
          $or: [
            // If currentLocationId exists, match using it
            {
              currentLocationId: { $exists: true, $ne: null },
              currentLocationId: farm._id,
            },

            // If currentLocationId does not exist, use actualLocationId
            {
              $or: [
                { currentLocationId: { $exists: false } },
                { currentLocationId: null },
              ],
              actualLocationId: farm._id,
            },
          ],
          offlineReason: "",
          status: "online",
        },
        { $set: { status: "offline", offlineReason: "farm maintenance" } },
        { session },
      );
      const notification = new Notification({
        notification: `Farm ${farm.farm} is now offline due to planned maintenance.`,
        isRead: false,
      });
      await notification.save({ session });
      ann.activatedAt = now;
      ann.status = "active";
      await ann.save({ session });
    }
    await session.commitTransaction();
    console.log("Cron for activating maintenance success");
  } catch (error) {
    await session.abortTransaction();
    console.log("Cron Job For Starting Downtime has failed.", error.message);
  } finally {
    session.endSession();
  }
};

export const endDowntime = async () => {
  const now = new Date();
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const completed = await FarmAnnouncement.find({
      status: "active",
      endAt: { $lte: now },
    })
      .populate("farm")
      .session(session);
    for (const ann of completed) {
      const farm = ann.farm;
      if (!farm) continue;
      if (farm.farmStatus === "Offline") {
        farm.farmStatus = "Active";
        const currentDowntime = farm.downTimeHistory?.find(
          (item) => item.announcement.toString() === ann._id.toString(),
        );
        if (currentDowntime) {
          currentDowntime.endAt = now;
        }
        await farm.save({ session });
      }
      await Data.updateMany(
        {
          $or: [
            // If currentLocationId exists, use it
            {
              currentLocationId: { $exists: true, $ne: null },
              currentLocationId: farm._id,
            },

            // Otherwise use actualLocationId
            {
              $or: [
                { currentLocationId: { $exists: false } },
                { currentLocationId: null },
              ],
              actualLocationId: farm._id,
            },
          ],
          offlineReason: "farm maintenance",
        },
        { $set: { status: "online", offlineReason: "" } },
        { session },
      );
      ann.status = "completed";
      ann.completedAt = now;
      await ann.save({ session });
    }
    await session.commitTransaction();
    console.log("Cron for ending maintenance success");
  } catch (error) {
    await session.abortTransaction();
    console.log("cron for ending maintenance failed", error.message);
  } finally {
    session.endSession();
  }
};
