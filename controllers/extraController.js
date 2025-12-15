import { NotFoundError } from "../errors/customErrors.js";
import BitCoinData from "../models/BitCoinData.js";

export const getBtcData = async (req, res) => {
  try {
    const data = await BitCoinData.findOne();
    if (!data) throw new NotFoundError("No data found");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: error.msg || error.message });
  }
};
