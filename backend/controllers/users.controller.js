const express = require("express");
const app = express();

const model = require("../models/users.model");

async function getUsers(req, res) {
  const result = await model.getAll();
  res.json(result);
}

async function getUser(req, res) {
  result = await model.getOne();
  if (result === 403) return res.status(403).send("You are not logged in");
  res.json(result);
}

async function loginUser(req, res) {
  const url = req.url;
  const id = req.params.id;
  let data = req.body;
  result = await model.login(id, data, url);
  if (result === 400)
    return res.status(400).send("Email/password missing");
  if (result === 404) return res.status(404).send("Wrong email/password");
  res.json(result);
}

async function postUser(req, res) {
  let data = req.body;
  let result = await model.addOne(data);
  if (result === 400)
    return res.status(400).send("You need to send all input data");
  if (result === 409) return res.status(409).send("User already exists");
  res.json(result);
}


module.exports = {
  getUser,
  getUsers,
  loginUser,
  postUser,
};
