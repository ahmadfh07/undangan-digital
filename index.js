require("./utils/dbconnect");
const Reciever = require("./model/reciever");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const port = 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);

app.get("/", (req, res) => {
  res.render("home", {
    title: "HOME",
    layout: "layout/main-layout",
  });
});

app.get("/undangan/:url", async (req, res) => {
  const reciever = await Reciever.findOne({ url: req.params.url });
  res.render("undangan", {
    title: "Undangan",
    layout: "layout/main-layout",
    reciever,
  });
});

app.use((req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

server.listen(process.env.PORT || port, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
