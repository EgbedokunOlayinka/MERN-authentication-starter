const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
