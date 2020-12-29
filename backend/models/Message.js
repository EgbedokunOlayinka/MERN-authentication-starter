const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const messageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
