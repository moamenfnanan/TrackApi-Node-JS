const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");
const Tracks = mongoose.model("Tracks");
const router = express.Router();
router.use(requireAuth);
router.get("/tracks", async (req, res) => {
  const tracks = await Tracks.find({ userId: req.user._id });
  res.send({ tracks });
});
router.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;
  if (!name || !locations) {
    return res
      .status(422)
      .send({ error: "You must be provide name and locations" });
  }
  try {
    const track = new Tracks({ name, locations, userId: req.user._id });
    await track.save();
    res.send(track);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});
module.exports = router;
