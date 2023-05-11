const express = require('express');
const router = express.Router();
const { Schedule } = require('../models');

// Define all CRUD operations to be performed on the Schedule Model!

// GET all schedules? no?

// GET user's schedule by id
router.get('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      res.status(404).json({ message: 'Schedule not found!' });
      return;
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CREATE (POST) new schedule (+ create new event on schedule?)
router.post('/', async (req, res) => {
  try {
    const schedule = await Schedule.create(req.body);
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE (PUT) schedule by id
router.put('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!schedule) {
      res.status(404).json({ message: 'Schedule not found!' });
      return;
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE schedule by id
router.delete('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) {
      res.status(404).json({ message: 'Schedule not found!' });
      return;
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
