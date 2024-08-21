const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validate-token");
const EventModel = require("../models/event-model");

// creating an event
router.post("/create-event", validateToken, async (req, res) => {
  try {
    const event = await EventModel.create(req.body);
    return res
      .status(201)
      .json({ message: "Ëvent created successfully", event });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
// Editing an event
router.put("/edit-event/:id", validateToken, async (req, res) => {
  try {
    const event = await EventModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json({ message: "Event updated successfully", event });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// deleting an event
router.delete("delete-event/:id", validateToken, async (req, res) => {
  try {
    await EventModel.findByIdAndDelete(req.params.id);
    return res.json({ message: "Event deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// get all events
router.get("/get-events", validateToken, async (req, res) => {
  try {
    const events = await EventModel.find();
    return json({ data: events });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// get particular event
router.get("/get-event/:id", validateToken, async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id);
    return json({ data: event });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
