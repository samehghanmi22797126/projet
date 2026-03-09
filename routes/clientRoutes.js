const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

router.post("/", async (req, res) => {
  const client = new Client(req.body);
  await client.save();
  res.json(client);
});

router.get("/", async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
});

module.exports = router;
