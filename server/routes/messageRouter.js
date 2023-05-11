const express = require('express');
const router = express.Router();
const { Message } = require('../models');

// GET all msgs
router.get('/', async (req, res) => {
  try {
    const msg = await Message.find();
    res.json(msg);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET msg by id
router.get('/:id', async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) {
      res.status(404).json({ message: 'Message not found!' });
      return;
    }
    res.json(msg);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CREATE (POST) new msg
router.post('/', async (req, res) => {
  try {
    const msg = await Message.create(req.body);
    res.status(201).json(msg);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE (PUT) msg by id
router.put('/:id', async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!msg) {
      res.status(404).json({ message: 'Message not found!' });
      return;
    }
    res.json(msg);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE msg by id
router.delete('/:id', async (req, res) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id);
    if (!msg) {
      res.status(404).json({ message: 'Message not found!' });
      return;
    }
    res.json(msg);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
