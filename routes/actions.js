var express = require("express");
var router = express.Router();
const Models = require("./../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Action = Models.Actionr;
dotenv.config();

router.post("/", async (req, res, next) => {
  console.log("Creando");
  try {
    let token = req.headers["authorization"].split(" ")[1];
    let decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
  } catch (err) {
    res.status(401).json({ msg: "Couldnt Authenticate" });
  }
  try {
    console.log("id", req.user.id);
    let newAction = {
      idUsuario: req.user.id,
      name: req.body.name,
      symbol: req.body.symbol,
      currency: req.body.currency,
    };
    let action = await Action.create(newAction);
    res.status(200).json(action);

    if (action === null) {
      res.status(404).json({ msg: "Action not found" });
    }
  } catch (error) {
    res.status(500).json(`Internal server error. ${error}`);
  }
});

router.get(
  "/",
  async (req, res, next) => {
    try {
      let token = req.headers["authorization"].split(" ")[1];
      let decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ msg: "Couldnt Authenticate" });
    }
  },
  async (req, res, next) => {
    let action = await Action.findAll({ where: { idUsuario: req.user.id } });
    if (action === null) {
      res.status(404).json({ msg: "Action not found" });
    }
    res.status(200).json(action);
  }
);

module.exports = router;
