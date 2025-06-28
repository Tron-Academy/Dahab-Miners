import { NotFoundError, UnauthenticatedError } from "../../errors/customErrors";
import MiningUser from "../../models/miningApp/MiningUser.js";
import { comparePassword, hashPassword } from "../../utils/bcrypt.js";
import { createJWT } from "../../utils/jwtUtils.js";

export const miningRegister = async (req, res) => {
  const { email, password } = req.body;
  const username = email.split(".")[0];
  const hashed = await hashPassword(password);
  const newUser = new MiningUser({
    username,
    email,
    password: hashed,
  });
  await newUser.save();
  const token = createJWT({
    userId: newUser._id,
    username: newUser.username,
    role: "mining-user",
  });
  const tenDay = 1000 * 60 * 60 * 24 * 10;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + tenDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ msg: "successfully Registered", token });
};

export const miningLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await MiningUser.findOne({ email: email });
  if (!user) throw new NotFoundError("Invalid Credentials");
  const isPasswordCorrect = await comparePassword(password, user.password);
  if (!isPasswordCorrect) throw new UnauthenticatedError("Invalid credentials");
  const token = createJWT({
    userId: user._id,
    username: user.username,
    role: "mining-user",
  });
  const tenDay = 1000 * 60 * 60 * 24 * 10;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + tenDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ msg: "successfully Logged in", token });
};
