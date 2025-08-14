import { NotFoundError } from "../../errors/customErrors.js";
import MiningTerms from "../../models/miningApp/MiningTerms.js";

export const addNewTerms = async (req, res) => {
  const { version, content } = req.body;
  const addNewTerms = new MiningTerms({
    date: new Date(),
    version,
    content,
  });
  await addNewTerms.save();
  res.status(201).json({ msg: "Successfully Saved", addNewTerms });
};

export const getAllTerms = async (req, res) => {
  const allTerms = await MiningTerms.find().sort({ createdAt: "-1" });
  res.status(200).json(allTerms);
};

export const getLatestTerms = async (req, res) => {
  const terms = await MiningTerms.findOne().sort({ createdAt: "-1" });
  if (terms) throw new NotFoundError("No terms found");
  res.status(200).json(terms);
};
