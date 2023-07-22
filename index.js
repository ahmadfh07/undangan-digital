const { connectDB } = require("./utils/dbconnect");
const Reciever = require("./model/reciever");
const Attendee = require("./model/attendee");
const Saying = require("./model/saying");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const qrcode = require("qrcode");
// const { body, validationResult, check } = require("express-validator");

const port = 3000;
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);

app.get("/", async (req, res) => {
  res.render("home", {
    title: "HOME",
    layout: "layout/landing-page-layout",
  });
});

app.get("/undangan/:url", async (req, res) => {
  const reciever = await Reciever.findOne({ url: req.params.url });
  const lastTenSayings = await Saying.find({}).sort({ _id: -1 }).limit(10);
  const confirmedToAttendCount = await Reciever.find({ attendanceStatus: "hadir" }).count();
  qrcode.toDataURL(JSON.stringify(reciever), (err, url) => {
    res.render("undangan-ajilina", {
      title: "Undangan",
      layout: "layout/main-layout",
      reciever: reciever ? reciever : { Nama: "Fulanah binti fulan" },
      confirmedToAttendCount,
      lastTenSayings,
      QRurl: url,
    });
  });
});

app.post("/undangan/:url/presensi", async (req, res) => {
  try {
    const reciever = await Reciever.findOneAndUpdate({ url: req.params.url }, { attendanceStatus: "hadir" });
    if (!reciever) {
      throw new Error("Anda tidak termasuk tamu undangan");
    } else {
      res.send({ status: "error", msg: "Berhasil mengkonfirmasi kehadiran" });
    }
  } catch (err) {
    res.send({ status: "error", msg: err.message });
  }
});

app.post("/undangan/:url/ucapan", async (req, res) => {
  try {
    const reciever = await Reciever.findOne({ url: req.params.url });
    if (!reciever) {
      throw new Error("Pengirim tidak valid");
    }
    const saying = await Saying.insertMany({ Nama: reciever.Nama, NoHp: reciever.NoHp, saying: req.body.saying });
    res.send({ status: "success", msg: "Berhasil mengirim ucapan" });
  } catch (err) {
    res.send({ status: "error", msg: err.message });
  }
});

app.get("/scanner", (req, res) => {
  res.render("scanner", {
    title: "Scanner",
    layout: "layout/main-layout",
  });
});

app.post("/kedatangan", async (req, res) => {
  let attendee = await Attendee.findOne({ Nama: req.body.Nama });
  if (!attendee) {
    Attendee.insertMany([{ Nama: req.body.Nama, NoHp: req.body.NoHp }]);
    res.send({ status: "Success : data berhasil dicatat" });
  } else {
    res.send({ status: "Sudah Input : qr code hanya bisa untuk sekali" });
  }
});

app.use((req, res) => {
  res.status(404);
  res.render("eror", {
    title: "ERROR 404",
    layout: "layout/main-layout",
  });
});

connectDB().then(() => {
  server.listen(process.env.PORT || port, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
});