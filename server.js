// Imports
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const corsCfg = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
// --------------------------------------------------

// Express Config
const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsCfg));
// --------------------------------------------------

app.get("/", async (req, res) => {
  return res.json({ msg: "thumbsup" });
});

app.post("/auth", async (req, res) => {
  const { user, pass } = req.body;

  console.log(user, pass);
  if (user !== "admin" && pass !== "admin") {
    return res.json({ msg: "Usuário ou Senha incorretos.", status: 1 });
  } else {
    return res.json({ msg: "ok", status: 0 });
  }
});

app.listen(port, () => {
  console.log("rodando...");
});
