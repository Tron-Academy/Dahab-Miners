import { NotFoundError } from "../errors/customErrors.js";
import IssueType from "../models/IssueType.js";

export const addIssueType = async (req, res) => {
  try {
    const { issueType } = req.body;
    const newType = await IssueType.create({
      issueType: issueType,
    });
    res.status(201).json(newType);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

export const getAllIssueTypes = async (req, res) => {
  try {
    const issueTypes = await IssueType.find();
    // if (issueTypes.length < 1) throw new NotFoundError("No issue Types found");
    res.status(200).json(issueTypes);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};

//edit an issue type
export const editIssueType = async (req, res) => {
  try {
    const { id, issueType } = req.body;
    const issue = await IssueType.findByIdAndUpdate(
      id,
      { issueType },
      { new: true },
    );
    if (!issue) throw new NotFoundError("No issue Type found");
    res.status(200).json({ message: "updated", issue });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.msg || error.message });
  }
};
