// Imports
require("dotenv").config();
const msg = require("./msg.js");
const express = require("express");
const mongoose = require("mongoose");
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

// MongoDB config
mongoose.set("strictQuery", false);

// Express Config
const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsCfg));
// --------------------------------------------------

const validarToken = (token) => {
  if (token !== 55) {
    true;
  } else false;
};

//? =================
//? STATUS CODES
//? 0 - Erro
//? 1 - Sucesso
//? 2 - Informação
//? 3 - Erro Interno
//? =================

app.get("/", async (req, res) => {
  validarToken();
  return res.json({ msg: "thumbsup" });
});

// listar barbeiros em região especifica (via CEP)
app.post("/barber/list/", async (req, res) => {
  const { cep, flashToken } = req.body;
  // listar todos as barberaias que tenham o cep desejado.
  if (cep === undefined) {
    return res.json({
      status: 0,
      msg: msg.cepNotFound,
    });
  } else {
    return res.json({ status: 0, msg: msg.barberNotFound });
  }
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

//! .ENV
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

//? Conexão a DB (dados no .env)
mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPass}@cluster0.w2im0t0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(
    app.listen(port, () => {
      console.log("rodando...");
    })
  )
  .catch((err) => {
    console.log(err);
  });
