import { NotFoundError } from "../../errors/customErrors.js";
import MiningPrivacy from "../../models/miningApp/MiningPrivacy.js";
import MiningTerms from "../../models/miningApp/MiningTerms.js";
import MiningUser from "../../models/miningApp/MiningUser.js";

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
  const allTerms = await MiningTerms.find().sort({ createdAt: -1 });
  res.status(200).json(allTerms);
};

export const getLatestTerms = async (req, res) => {
  const terms = await MiningTerms.findOne().sort({ createdAt: -1 });
  if (!terms) throw new NotFoundError("No terms found");
  res.status(200).json(terms);
};

export const addNewPrivacyPolicy = async (req, res) => {
  const { version, content } = req.body;
  const addNewPrivacy = new MiningPrivacy({
    date: new Date(),
    version,
    content,
  });
  await addNewPrivacy.save();
  res.status(201).json({ msg: "Successfully Saved", addNewPrivacy });
};

export const getAllPrivacyPolicies = async (req, res) => {
  const policies = await MiningPrivacy.find().sort({ createdAt: -1 });
  res.status(200).json(policies);
};

export const getLatestPolicy = async (req, res) => {
  const policy = await MiningPrivacy.findOne().sort({ createdAt: -1 });
  if (!policy) throw new NotFoundError("No Privacy Policy found");
  res.status(200).json(policy);
};

export const getCurrentTermsAndPrivacy = async (req, res) => {
  const policy = await MiningPrivacy.findOne().sort({ createdAt: -1 });
  if (!policy) throw new NotFoundError("No Privacy Policy found");
  const terms = await MiningTerms.findOne().sort({ createdAt: -1 });
  if (!terms) throw new NotFoundError("No terms found");
  res.status(200).json({ privacy: policy, terms: terms });
};

export const agreeTerms = async (req, res) => {
  const user = await MiningUser.findById(req.user.userId);
  if (!user) throw new NotFoundError("No user found");
  const policy = await MiningPrivacy.findOne().sort({ createdAt: -1 });
  if (!policy) throw new NotFoundError("No Privacy Policy found");
  const terms = await MiningTerms.findOne().sort({ createdAt: -1 });
  if (!terms) throw new NotFoundError("No terms found");
  user.latestPrivacyVersion = policy.version;
  user.latestTermVersion = terms.version;
  user.termsAgreementHistory.push({
    date: new Date(),
    version: terms.version,
  });
  user.privacyAgreementHistory.push({
    date: new Date(),
    version: policy.version,
  });
  await user.save();
  res.status(200).json({ msg: "successfully upgraded terms and condition" });
};
