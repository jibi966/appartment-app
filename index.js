const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const connect = require("./server/configs/db");
const loginController = require("./server/controllers/login.controller");
const registerController = require("./server/controllers/register.controller");
const flatController = require("./server/controllers/flat.controller");
const userController = require("./server/controllers/user.controller");
const authenticate = require("./server/middlewares/authenticate");
const authorize = require("./server/middlewares/authorize");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname + "./client/build")));

app.get("*", function (_, res) {
  res.sendFile(path.join(__dirname, "./client"), function (err) {
    res.status(500).send(err);
  });
});

app.use("/login", loginController);
app.use("/register", registerController);
app.use("/flats", authenticate, authorize, flatController);
app.use("/user", authenticate, authorize, userController);

app.listen(PORT, async () => {
  try {
    await connect();
    console.log("listening on port " + PORT);
  } catch (err) {
    console.log(err);
  }
});
