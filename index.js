const { connectDB } = require("./utils/dbconnect");
const Reciever = require("./model/reciever");
const Attendee = require("./model/attendee");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const qrcode = require("qrcode");

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
    layout: "layout/main-layout",
  });
});

app.get("/undangan/:url", async (req, res) => {
  const reciever = await Reciever.findOne({ url: req.params.url });
  qrcode.toDataURL(JSON.stringify(reciever), (err, url) => {
    res.render("undangan", {
      title: "Undangan",
      layout: "layout/main-layout",
      reciever: reciever ? reciever : { Nama: "Fulanah binti fulan" },
      QRurl: url,
    });
  });
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
    res.send({ status: "success", class: "buttonScan" });
  } else {
    res.send({ status: "sudah input", class: "buttonStopScan" });
  }
});

app.use((req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

connectDB().then(() => {
  server.listen(process.env.PORT || port, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
});
