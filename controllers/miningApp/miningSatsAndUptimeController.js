import A1246Uptime from "../../models/miningApp/MiningA1246Uptime.js";
import MiningSats from "../../models/miningApp/MiningSats.js";

export const addNewSats = async (req, res) => {
  const { sats } = req.body;
  const satDoc = await MiningSats.find();
  if (satDoc.length < 1) {
    const newSats = new MiningSats({
      satPerDay: sats,
      satHistory: [{ date: new Date(), sats: sats }],
    });
    await newSats.save();
    res.status(200).json({ msg: "successfully added new Sats", newSats });
  } else {
    satDoc[0].satPerDay = sats;
    satDoc[0].satHistory.push({ date: new Date(), sats: sats });
    await satDoc[0].save();
    res
      .status(200)
      .json({ msg: "successfully added new Sats", newSats: satDoc[0] });
  }
};

export const getSats = async (req, res) => {
  const sats = await MiningSats.find();
  res.status(200).json(sats);
};

export const addA1246Uptime = async (req, res) => {
  const { uptime } = req.body;
  const uptimes = await A1246Uptime.find();
  if (uptimes.length < 1) {
    const newUptime = new A1246Uptime({
      A1246Uptime: uptime,
      uptimeHistory: [{ date: new Date(), uptime: uptime }],
    });
    await newUptime.save();
    res
      .status(200)
      .json({ msg: "successfully added uptime", uptime: newUptime });
  } else {
    uptimes[0].A1246Uptime = uptime;
    uptimes[0].uptimeHistory.push({ date: new Date(), uptime: uptime });
    await uptimes[0].save();
    res
      .status(200)
      .json({ msg: "successfully added uptime", uptime: uptimes[0] });
  }
};

export const getA1246Uptime = async (req, res) => {
  const uptimes = await A1246Uptime.find();
  res.status(200).json({ uptime: uptimes[0] });
};
