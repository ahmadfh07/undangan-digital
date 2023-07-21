const mongoose = require("mongoose");
const recieverSchema = mongoose.Schema(
  {
    Nama: {
      type: String,
      required: true,
    },
    NoHp: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    attendanceStatus: {
      type: String,
      default: "tidak hadir",
    },
  },
  { timestamp: true }
);

const Reciever = mongoose.model("Reciever", recieverSchema);

module.exports = Reciever;
