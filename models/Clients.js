import mongoose, { model, Schema } from "mongoose";

const WatcherLinkSchema = new Schema({
  link: String,
  coin: String,
});

const ClientSchema = new Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    clientId: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      select: false,
    },
    address: {
      type: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
      },
    },
    verification: {
      type: String,
    },
    internalNote: {
      type: [String],
      default: [],
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phone: {
      type: String,
    },
    companyName: {
      type: String,
    },
    allTermsAccepted: {
      type: Boolean,
      default: false,
    },
    watcherLinks: {
      type: [WatcherLinkSchema],
    },
    owned: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Data",
        },
      ],
    },
  },
  { timestamps: true },
);

ClientSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});
const Client = model("Client", ClientSchema);
export default Client;
