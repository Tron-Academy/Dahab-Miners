import axios from "axios";
import { NotFoundError } from "../errors/customErrors.js";
import Issue from "../models/intermine/Issue.js";
import Message from "../models/intermine/Message.js";
import { intermineURL } from "../utils/dropdowns.js";

//Get All Message Groups. This will be the Total Issues Reported
export const GetMessageGroups = async (req, res) => {
  try {
    const { query, currentPage } = req.query;
    const page = Number(currentPage) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;
    const queryObject = {};
    if (query && query !== "") {
      const searchRegex = new RegExp(query, "i");
      queryObject.$or = [
        { clientName: searchRegex },
        { issue: searchRegex },
        { description: searchRegex },
        { miner: searchRegex },
        { serialNumber: searchRegex },
      ];
    }
    const messageGroups = await Issue.find(queryObject)
      .populate("messages")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalMessageGroups = await Issue.countDocuments(queryObject);
    const totalPages = Math.ceil(totalMessageGroups / limit);
    res.status(200).json({ messageGroups, totalMessageGroups, totalPages });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ msg: error.msg || error.message });
  }
};

//send a message
export const sendMessage = async (req, res) => {
  try {
    const { message, issueGroup } = req.body;
    const messageGroup = await Issue.findById(issueGroup);
    if (!messageGroup) throw new NotFoundError("No Message Group found");
    const newMessage = new Message({
      message: message,
      issue: messageGroup._id,
      sendBy: "Dahab",
      status: "Pending",
    });
    messageGroup.messages.push(newMessage._id);
    await axios.post(
      `${intermineURL}/receive-message`,
      {
        issueId: messageGroup.issueId,
        message,
        serviceProvider: "Dahab",
      },
      {
        headers: {
          "x-api-key": process.env.INTERMINE_API_KEY,
        },
      }
    );
    await newMessage.save();
    await messageGroup.save();
    res.status(200).json({ msg: "message send" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ msg: error.msg || error.message });
  }
};
