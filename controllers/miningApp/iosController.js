import { NotFoundError } from "../../errors/customErrors.js";
import IOS from "../../models/miningApp/IOSTrue.js";

export const getIsIosTrue = async (req, res) => {
  try {
    const isIos = await IOS.findOne();
    if (!isIos) throw new NotFoundError("Nothing found");
    res.status(200).json(isIos);
  } catch (error) {
    res.status(500).json({ msg: "something went wrong" });
  }
};
