import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import Client from "../models/Clients.js";
import { hashPassword } from "../utils/bcrypt.js";
import { sendMail, transporter } from "../utils/nodemailer.js";
import Data from "../models/DataModel.js";

export const addNewClient = async (req, res) => {
  try {
    const { name, clientId, email, password, address, companyName, watcher } =
      req.body;
    const hashedPassword = await hashPassword(password);
    const user = await Client.create({
      clientName: name,
      firstName: name,
      clientId: clientId,
      companyName: companyName || "",
      email: email.toLowerCase(),
      password: hashedPassword,
      watcherLinks: watcher ? JSON.parse(watcher) : [],
      address: {
        street: address,
      },
    });
    const mailOptions = {
      from: {
        name: "Dahab Miners",
        address: process.env.NODEMAILER_EMAIL,
      },
      to: user.email,
      subject: "Account Activated",
      text: `Welcome to Dahab Miners. \nYour Mining Account has been activated. Please login to your dashboard at  \nYou are free to reset your password once you logged in. \nEMAIL: ${user.email} \nPASSWORD: ${password}`,
    };
    await sendMail(transporter, mailOptions);
    res.status(200).json({ message: "success", user });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

export const getAllClients = async (req, res) => {
  try {
    const { currentPage, query, status } = req.query;
    const queryObject = {};
    if (query && query !== "") {
      queryObject.$or = [
        { clientName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { companyName: { $regex: query, $options: "i" } },
      ];
    }
    if (status && status !== "ALL") {
      queryObject.status = status;
    }
    const page = Number(currentPage) || 1;
    const limit = 15;
    const skip = (page - 1) * limit;
    const clients = await Client.find(queryObject)
      .populate("owned", "power hashRate status")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const totalClients = await Client.countDocuments(queryObject);
    const totalPages = Math.ceil(totalClients / limit);
    res.status(200).json({ clients, totalPages });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

export const getSingleClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id).populate("owned");
    if (!client) throw new NotFoundError("No client found");
    res.status(200).json(client);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

//add note for client

export const addClientNote = async (req, res) => {
  try {
    const { note, user } = req.body;
    const client = await Client.findById(user);
    if (!client) throw new NotFoundError("No user found");
    client.internalNote.push(note);
    await client.save();
    res.status(200).json({ message: "Note added successfully", client });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

//clear notes
export const clearClientNotes = async (req, res) => {
  try {
    const { user } = req.body;
    const client = await Client.findById(user);
    if (!client) throw new NotFoundError("No user found");
    client.internalNote = [];
    await client.save();
    res.status(200).json({ message: "Notes cleared" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

export const editClient = async (req, res) => {
  try {
    const { name, clientId, email, address, companyName, watcher, userId } =
      req.body;
    const user = await Client.findById(userId);
    if (!user) throw new NotFoundError("No user has been found");
    const clientIdExist = await Client.findOne({ clientId: clientId });
    if (clientIdExist && clientIdExist._id.toString() !== user._id.toString())
      throw new BadRequestError("client Id already exist");
    const emailAlreadyExist = await Client.findOne({
      email: email.toLowerCase(),
    });
    if (
      emailAlreadyExist &&
      emailAlreadyExist._id.toString() !== user._id.toString()
    )
      throw new BadRequestError("Email already exist");
    user.clientId = clientId;
    user.email = email.toLowerCase();
    user.clientName = name;
    user.address.street = address;
    user.companyName = companyName || "";
    user.watcherLinks = watcher ? JSON.parse(watcher) : [];
    await user.save();
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

// export const deleteClient = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     const { id } = req.params;
//     const user = await Client.findById(id).session(session);
//     if (!user) throw new NotFoundError("No user found");
//     const allMiners = await Data.find({ client: user._id }).session(session);
//     for (const miner of allMiners) {
//       const farm = await MiningFarm.findOne({ farm: miner.location }).session(
//         session,
//       );
//       if (!farm) continue;
//       farm.current -= miner.power;
//       farm.miners = farm.miners.filter(
//         (item) => item.toString() !== miner._id.toString(),
//       );
//       await farm.save({ session });
//     }
//     await Promise.all([
//       Miner.deleteMany({ client: user._id }).session(session),
//       Issue.deleteMany({ user: user._id }).session(session),
//       Warranty.deleteMany({ user: user._id }).session(session),
//       Message.deleteMany({ client: user._id }).session(session),
//       Agreement.deleteMany({ user: user._id }).session(session),
//       User.deleteOne({ _id: user._id }).session(session),
//     ]);
//     await session.commitTransaction();
//     session.endSession();

//     const mailOptions = {
//       from: {
//         name: "Intermine",
//         address: process.env.NODEMAILER_EMAIL,
//       },
//       to: user.email,
//       subject: "Account Deleted",
//       text: `Your Mining Account has been Deleted. All Your data including miners, issues, agreements, warranties and message data has been removed. Thank you for spending your valuable time with us`,
//     };
//     await sendMail(transporter, mailOptions);
//     res.status(200).json({ message: "Account Deleted" });
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     res
//       .status(error.statusCode || 500)
//       .json({ error: error.msg || error.message });
//   }
// };
