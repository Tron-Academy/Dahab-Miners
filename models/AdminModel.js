import { model, Schema } from "mongoose";
import { type } from "os";

const AdminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verificationCode: {
      type: String,
    },
    role: {
      type: String,
      enum: ["superAdmin", "admin", "seo"],
    },
  },
  {
    timestamps: true,
  }
);

const Admin = model("Admin", AdminSchema);
export default Admin;
