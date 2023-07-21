const mongoose = require("mongoose");
const sayingSchema = mongoose.Schema(
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
    saying: {
      type: String,
    },
    date: { type: Date, default: Date.now },
  },
  { timestamp: true }
);

const Saying = mongoose.model("Saying", sayingSchema);

module.exports = Saying;
