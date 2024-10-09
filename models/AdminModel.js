import { model, Schema } from "mongoose";

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
  },
  {
    timestamps: true,
  }
);

const Admin = model("Admin", AdminSchema);
export default Admin;
