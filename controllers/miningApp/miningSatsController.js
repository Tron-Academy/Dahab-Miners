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
