import { NotFoundError } from "../../errors/customErrors.js";
import IOS from "../../models/miningApp/IOSTrue.js";

export const getIsIosTrue = async (req, res) => {
  const isIos = await IOS.findOne();
  if (!isIos) throw new NotFoundError("Nothing found");
  res.stattus(200).json(isIos);
};
