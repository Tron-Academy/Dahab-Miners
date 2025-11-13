const { Schema, model } = require("mongoose");

const IOSTrueSchema = new Schema(
  {
    isIOS: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const IOS = model("IOS", IOSTrueSchema);
export default IOS;
