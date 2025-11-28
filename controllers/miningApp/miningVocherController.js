import { NotFoundError } from "../../errors/customErrors.js";
import MiningVoucher from "../../models/miningApp/MiningVoucher.js";

export const addNewVoucher = async (req, res) => {
  try {
    const {
      name,
      code,
      description,
      voucherType,
      validity,
      minimum,
      discount,
    } = req.body;
    const newVoucher = new MiningVoucher({
      name: name,
      code: code,
      description: description,
      applicableFor: voucherType,
      validity: new Date(validity),
      minimumSpent: minimum,
      discount: discount,
    });
    await newVoucher.save();
    res.status(200).json({ message: "Added successfully", newVoucher });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ msg: error.msg || error.message });
  }
};

export const getAllVouchers = async (req, res) => {
  try {
    const vouchers = await MiningVoucher.find().sort({ createdAt: -1 });
    res.status(200).json(vouchers);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ msg: error.msg || error.message });
  }
};

export const getSingleVoucher = async (req, res) => {
  try {
    const voucher = await MiningVoucher.findById(req.params.id);
    if (!voucher) throw new NotFoundError("No voucher found");
    res.status(200).json(voucher);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ msg: error.msg || error.message });
  }
};

export const editVoucher = async (req, res) => {
  try {
    const {
      name,
      code,
      description,
      voucherType,
      validity,
      minimum,
      discount,
    } = req.body;
    const voucher = await MiningVoucher.findById(req.params.id);
    if (!voucher) throw new NotFoundError("No voucher found");
    voucher.name = name;
    voucher.code = code;
    voucher.description = description;
    voucher.applicableFor = voucherType;
    voucher.validity = new Date(validity);
    voucher.minimumSpent = minimum;
    voucher.discount = discount;
    await voucher.save();
    res.status(200).json({ message: "Voucher updated successfully", voucher });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ msg: error.msg || error.message });
  }
};

export const deleteVoucher = async (req, res) => {
  try {
    const voucher = await MiningVoucher.findByIdAndDelete(req.params.id);
    if (!voucher) throw new NotFoundError("No voucher found");
    res.status(200).json({ message: "Voucher deleted successfully", voucher });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ msg: error.msg || error.message });
  }
};
