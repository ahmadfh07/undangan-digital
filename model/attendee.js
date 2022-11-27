const mongoose = require("mongoose");
const attendeeSchema = mongoose.Schema(
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
    date: { type: Date, default: Date.now },
  },
  { timestamp: true }
);

const Attendee = mongoose.model("Attendee", attendeeSchema);

module.exports = Attendee;
